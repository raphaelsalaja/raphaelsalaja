"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Avatar,
  Dot,
  Icons,
  Keycap,
  Keys,
  LABELS,
  ME,
  PEOPLE,
  PRIORITIES,
  PROJECTS,
  PriorityIcon,
  ProjectIcon,
  type Shortcut,
  SIZE,
  STATUSES,
  type Status,
  StatusIcon,
} from "./parts";
import styles from "./styles.module.css";

type PageId = "root" | "status" | "priority" | "assign" | "labels" | "project";

type Issue = {
  id: string;
  title: string;
  status: Status;
  priority: number;
  assignee?: string;
  project?: string;
  labels: string[];
};

type Action =
  | { type: "page"; page: PageId }
  | { type: "status"; status: Status }
  | { type: "priority"; priority: number }
  | { type: "assign"; person: string | null }
  | { type: "label"; label: string }
  | { type: "project"; project: string | null }
  | { type: "copy"; what: "id" | "url" | "branch" }
  | { type: "open"; issueId: string }
  | { type: "close"; notice: string };

type Item = {
  id: string;
  label: string;
  parent?: string;
  detail?: string;
  group: string;
  keywords?: string;
  icon?: ReactNode;
  shortcut?: Shortcut;
  num?: number;
  selected?: boolean;
  multi?: boolean;
  action: Action;
};

type Frame = { page: PageId; query: string; focus: number };

type Row =
  | { type: "header"; id: string; group: string }
  | { type: "item"; item: Item; index: number }
  | { type: "empty"; text: string };

const ISSUE_GROUP = "issue";

const INITIAL_ISSUES: Issue[] = [
  {
    id: "PND-18",
    title: "Archive a page without the chrome",
    status: "progress",
    priority: 2,
    assignee: ME,
    project: "Pond",
    labels: ["Feature"],
  },
  {
    id: "AUD-7",
    title: "A note that decays",
    status: "todo",
    priority: 3,
    project: "Audio",
    labels: [],
  },
  {
    id: "CAM-3",
    title: "One layout, two trees",
    status: "backlog",
    priority: 0,
    project: "Cambio",
    labels: ["Improvement"],
  },
  {
    id: "TOL-2",
    title: "The dialog should know where it opened",
    status: "done",
    priority: 4,
    assignee: "Ben Cho",
    project: "Toldo",
    labels: ["Bug"],
  },
];

const NAVIGATION: { label: string; key: string }[] = [
  { label: "Go to inbox", key: "I" },
  { label: "Go to projects", key: "P" },
  { label: "Go to cycles", key: "C" },
  { label: "Go to reviews", key: "R" },
  { label: "Go to drafts", key: "D" },
];

const NO_RESULTS: Record<PageId, string> = {
  root: "No results",
  status: "No matching states",
  priority: "No matching priorities",
  assign: "No matching users",
  labels: "No matching labels",
  project: "No matching projects",
};

const CODE: Record<string, string> = { ".": "Period", ",": "Comma" };

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function placeholder(page: PageId, issue: Issue | null) {
  if (page === "status") return "Change status…";
  if (page === "priority") {
    return issue?.priority === 0 ? "Set priority to…" : "Change priority to…";
  }
  if (page === "assign") return "Assign to…";
  if (page === "labels") {
    return issue?.labels.length ? "Change or add labels…" : "Add labels…";
  }
  if (page === "project") {
    return issue?.project ? "Move to project…" : "Add to project…";
  }
  return "Type a command or search…";
}

function statusItems(issue: Issue, parent?: string): Item[] {
  return STATUSES.map((status, index) => ({
    id: `status-${status.id}`,
    label: status.name,
    parent,
    group: ISSUE_GROUP,
    icon: <StatusIcon status={status.id} />,
    num: parent ? undefined : index + 1,
    selected: issue.status === status.id,
    action: { type: "status", status: status.id },
  }));
}

function priorityItems(issue: Issue, parent?: string): Item[] {
  return PRIORITIES.map((priority) => ({
    id: `priority-${priority.id}`,
    label: priority.name,
    parent,
    group: ISSUE_GROUP,
    icon: <PriorityIcon priority={priority.id} />,
    num: parent ? undefined : priority.id,
    selected: issue.priority === priority.id,
    action: { type: "priority", priority: priority.id },
  }));
}

function personItems(issue: Issue, parent?: string): Item[] {
  const people: Item[] = PEOPLE.map((person) => ({
    id: `person-${slug(person.name)}`,
    label: person.name,
    parent,
    group: ISSUE_GROUP,
    icon: <Avatar name={person.name} />,
    selected: issue.assignee === person.name,
    action: { type: "assign", person: person.name },
  }));
  if (parent) return people;
  return [
    {
      id: "person-none",
      label: "No assignee",
      group: ISSUE_GROUP,
      keywords: "unassigned",
      icon: <Icons.unassigned />,
      selected: !issue.assignee,
      action: { type: "assign", person: null },
    },
    ...people,
  ];
}

function labelItems(issue: Issue, hoisted = false): Item[] {
  return LABELS.map((label) => {
    const has = issue.labels.includes(label.name);
    return {
      id: `label-${slug(label.name)}`,
      label: label.name,
      parent: hoisted ? (has ? "Change label" : "Add label") : undefined,
      group: ISSUE_GROUP,
      icon: <Dot color={label.color} />,
      selected: has,
      multi: !hoisted,
      action: { type: "label", label: label.name },
    };
  });
}

function projectItems(issue: Issue): Item[] {
  return [
    {
      id: "project-none",
      label: "No project",
      group: ISSUE_GROUP,
      icon: <Icons.project />,
      selected: !issue.project,
      action: { type: "project", project: null },
    },
    ...PROJECTS.map((project) => ({
      id: `project-${slug(project.name)}`,
      label: project.name,
      group: ISSUE_GROUP,
      icon: <ProjectIcon color={project.color} />,
      selected: issue.project === project.name,
      action: { type: "project" as const, project: project.name },
    })),
  ];
}

function issueActions(issue: Issue): Item[] {
  const mine = issue.assignee === ME;
  return [
    {
      id: "status",
      label: "Change status…",
      group: ISSUE_GROUP,
      keywords: "state workflow",
      icon: <Icons.status />,
      shortcut: { keys: ["s"] },
      action: { type: "page", page: "status" },
    },
    {
      id: "priority",
      label: issue.priority === 0 ? "Set priority…" : "Change priority…",
      group: ISSUE_GROUP,
      keywords: "urgent high medium low",
      icon: <Icons.priority />,
      shortcut: { keys: ["p"] },
      action: { type: "page", page: "priority" },
    },
    {
      id: "assign",
      label: "Assign to…",
      group: ISSUE_GROUP,
      keywords: "assignee user person",
      icon: <Icons.person />,
      shortcut: { keys: ["a"] },
      action: { type: "page", page: "assign" },
    },
    {
      id: "assign-me",
      label: mine ? "Un-assign from me" : "Assign to me",
      group: ISSUE_GROUP,
      keywords: "self",
      icon: <Icons.me />,
      shortcut: { keys: ["i"] },
      action: { type: "assign", person: mine ? null : ME },
    },
    {
      id: "labels",
      label: issue.labels.length ? "Change or add labels…" : "Add labels…",
      group: ISSUE_GROUP,
      keywords: "add change tag",
      icon: <Icons.tag />,
      shortcut: { keys: ["l"] },
      action: { type: "page", page: "labels" },
    },
    {
      id: "project",
      label: issue.project ? "Move to project…" : "Add to project…",
      group: ISSUE_GROUP,
      keywords: "epic move add to project",
      icon: <Icons.project />,
      shortcut: { keys: ["p"], shift: true },
      action: { type: "page", page: "project" },
    },
    {
      id: "copy-id",
      label: "Copy issue ID",
      group: ISSUE_GROUP,
      keywords: "identifier url linkified markdown md html",
      icon: <Icons.id />,
      shortcut: { keys: ["."], mod: true },
      action: { type: "copy", what: "id" },
    },
    {
      id: "copy-url",
      label: "Copy issue URL",
      group: ISSUE_GROUP,
      keywords: "share link url",
      icon: <Icons.link />,
      shortcut: { keys: [","], mod: true, shift: true },
      action: { type: "copy", what: "url" },
    },
    {
      id: "copy-branch",
      label: "Copy git branch name",
      group: ISSUE_GROUP,
      keywords: "github gitlab",
      icon: <Icons.branch />,
      shortcut: { keys: ["."], mod: true, shift: true },
      action: { type: "copy", what: "branch" },
    },
  ];
}

function rootItems(
  issue: Issue | null,
  issues: Issue[],
  query: string,
): Item[] {
  const items: Item[] = [];
  if (issue) {
    items.push(...issueActions(issue));
    if (query) {
      items.push(...statusItems(issue, "Change status"));
      items.push(
        ...priorityItems(
          issue,
          issue.priority === 0 ? "Set priority to" : "Change priority to",
        ),
      );
      if (query.length >= 3) {
        items.push(...personItems(issue, "Assign to"));
        items.push(...labelItems(issue, true));
      }
    }
  }
  items.push({
    id: "create",
    label: "Create new issue…",
    group: "Issues",
    keywords: "add new",
    icon: <Icons.compose />,
    shortcut: { keys: ["c"] },
    action: { type: "close", notice: "Create new issue" },
  });
  if (!query) {
    items.push({
      id: "fullscreen",
      label: "Create issue in fullscreen…",
      group: "Issues",
      icon: <Icons.expand />,
      shortcut: { keys: ["v"] },
      action: { type: "close", notice: "Create issue in fullscreen" },
    });
  }
  if (query) {
    for (const entry of issues) {
      items.push({
        id: `issue-${entry.id}`,
        label: entry.title,
        detail: entry.id,
        group: "Issues",
        keywords: `${entry.id} ${entry.project ?? ""}`,
        icon: <StatusIcon status={entry.status} />,
        action: { type: "open", issueId: entry.id },
      });
    }
  }
  for (const entry of NAVIGATION) {
    items.push({
      id: `nav-${slug(entry.label)}`,
      label: entry.label,
      group: "Navigation",
      keywords: "open",
      shortcut: { keys: ["g", entry.key] },
      action: { type: "close", notice: entry.label },
    });
  }
  return items;
}

function pageItems(
  page: PageId,
  issue: Issue | null,
  issues: Issue[],
  query: string,
): Item[] {
  if (page === "root" || !issue) return rootItems(issue, issues, query);
  if (page === "status") return statusItems(issue);
  if (page === "priority") return priorityItems(issue);
  if (page === "assign") return personItems(issue);
  if (page === "labels") return labelItems(issue);
  return projectItems(issue);
}

function scoreText(query: string, text: string) {
  const hay = text.toLowerCase();
  if (hay.startsWith(query)) return 1200 - hay.length;
  const word = hay.indexOf(` ${query}`);
  if (word >= 0) return 1000 - word;
  const at = hay.indexOf(query);
  if (at >= 0) return 800 - at;

  let qi = 0;
  let run = 0;
  let score = 0;
  for (let i = 0; i < hay.length && qi < query.length; i++) {
    if (hay[i] === query[qi]) {
      qi += 1;
      run += 1;
      score += 8 + run * 4;
    } else {
      run = 0;
    }
  }
  return qi === query.length ? score : 0;
}

function scoreItem(query: string, item: Item) {
  if (!query) return 1;
  const label = scoreText(query, item.label);
  const rest = Math.max(
    item.detail ? scoreText(query, item.detail) : 0,
    item.keywords ? scoreText(query, item.keywords) * 0.5 : 0,
  );
  return Math.max(label, rest) - (item.parent ? 1 : 0);
}

function layout(items: Item[], query: string, page: PageId) {
  const ranked = items
    .map((item, index) => ({ item, index, score: scoreItem(query, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => (query ? b.score - a.score : 0) || a.index - b.index);

  const groups: { name: string; items: Item[] }[] = [];
  for (const entry of ranked) {
    const group = groups.find((g) => g.name === entry.item.group);
    if (group) group.items.push(entry.item);
    else groups.push({ name: entry.item.group, items: [entry.item] });
  }

  const rows: Row[] = [];
  const flat: Item[] = [];
  groups.forEach((group, index) => {
    const hidden =
      page !== "root" || (index === 0 && group.name === ISSUE_GROUP);
    if (!hidden)
      rows.push({ type: "header", id: group.name, group: group.name });
    for (const item of group.items) {
      rows.push({ type: "item", item, index: flat.length });
      flat.push(item);
    }
  });
  if (query && flat.length === 0) {
    rows.push({ type: "empty", text: NO_RESULTS[page] });
  }
  return { rows, items: flat };
}

function rowsHeight(rows: Row[]) {
  if (rows.length === 0) return 0;
  let height = SIZE.padding * 2;
  for (const row of rows) {
    height += row.type === "header" ? SIZE.header : SIZE.item;
  }
  return height;
}

export function CommandMenu() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const skipEnter = useRef(true);
  const openRef = useRef(true);
  const dipTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [open, setOpen] = useState(true);
  openRef.current = open;
  const [dip, setDip] = useState(false);
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [contextId, setContextId] = useState<string | null>(
    INITIAL_ISSUES[0].id,
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [stack, setStack] = useState<Frame[]>([
    { page: "root", query: "", focus: 0 },
  ]);

  const frame = stack[stack.length - 1];
  const nested = stack.length > 1;
  const issue = issues.find((entry) => entry.id === contextId) ?? null;
  const query = frame.query.trim().toLowerCase();
  const source = useMemo(
    () => pageItems(frame.page, issue, issues, query),
    [frame.page, issue, issues, query],
  );
  const view = useMemo(
    () => layout(source, query, frame.page),
    [source, query, frame.page],
  );
  const focus = Math.min(frame.focus, Math.max(view.items.length - 1, 0));
  const active = view.items[focus];
  const height = Math.min(
    SIZE.cap,
    SIZE.input + (issue ? SIZE.title : 0) + rowsHeight(view.rows),
  );
  const showNumbers = nested && frame.query.length === 0;

  useEffect(() => {
    skipEnter.current = false;
    return () => clearTimeout(dipTimer.current);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || event.shiftKey || event.altKey) {
        return;
      }
      if (!event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      if (openRef.current) {
        setOpen(false);
        return;
      }
      setStack([{ page: "root", query: "", focus: 0 }]);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const focusKey = useRef(`${open}:${frame.page}`);

  useEffect(() => {
    const next = `${open}:${frame.page}`;
    if (next === focusKey.current) return;
    focusKey.current = next;
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open, frame.page]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset scroll when the list changes jobs
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [frame.page, query, contextId]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: follow the focused row
  useEffect(() => {
    const list = listRef.current;
    const row = activeRef.current;
    if (!list || !row) return;
    if (focus === 0) {
      list.scrollTop = 0;
      return;
    }
    const top = row.offsetTop - SIZE.padding;
    const bottom = row.offsetTop + row.offsetHeight + SIZE.padding;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight;
    }
  }, [focus, frame.page]);

  function bump() {
    clearTimeout(dipTimer.current);
    setDip(true);
    dipTimer.current = setTimeout(() => setDip(false), 80);
  }

  function patchFrame(patch: Partial<Frame>) {
    setStack((current) => {
      const next = current.slice();
      next[next.length - 1] = { ...next[next.length - 1], ...patch };
      return next;
    });
  }

  function move(direction: number, repeat: boolean) {
    const count = view.items.length;
    if (count === 0) return;
    const atEdge =
      (direction < 0 && focus === 0) || (direction > 0 && focus === count - 1);
    if (repeat && atEdge) return;
    patchFrame({ focus: (focus + direction + count) % count });
  }

  function back() {
    setStack((current) => current.slice(0, -1));
    bump();
  }

  function drill(page: PageId) {
    setStack((current) => [...current, { page, query: "", focus: 0 }]);
    bump();
  }

  function clearContext() {
    setContextId(null);
    setStack([{ page: "root", query: "", focus: 0 }]);
    bump();
  }

  function close(message?: string) {
    if (message) setNotice(message);
    setOpen(false);
  }

  function update(patch: Partial<Issue>) {
    if (!issue) return;
    setIssues((current) =>
      current.map((entry) =>
        entry.id === issue.id ? { ...entry, ...patch } : entry,
      ),
    );
  }

  function select(item: Item) {
    const action = item.action;
    if (action.type === "page") {
      drill(action.page);
      return;
    }
    if (action.type === "close") {
      close(action.notice);
      return;
    }
    if (action.type === "open") {
      setContextId(action.issueId);
      close(`Opened ${action.issueId}`);
      return;
    }
    if (!issue) return;
    if (action.type === "status") {
      update({ status: action.status });
      const name = STATUSES.find((s) => s.id === action.status)?.name;
      close(`${issue.id} moved to ${name}`);
      return;
    }
    if (action.type === "priority") {
      update({ priority: action.priority });
      const name = PRIORITIES.find((p) => p.id === action.priority)?.name;
      close(`${issue.id} set to ${name}`);
      return;
    }
    if (action.type === "assign") {
      update({ assignee: action.person ?? undefined });
      close(
        action.person
          ? `${issue.id} assigned to ${action.person}`
          : `${issue.id} unassigned`,
      );
      return;
    }
    if (action.type === "project") {
      update({ project: action.project ?? undefined });
      close(
        action.project
          ? `${issue.id} moved to ${action.project}`
          : `${issue.id} removed from project`,
      );
      return;
    }
    if (action.type === "label") {
      const has = issue.labels.includes(action.label);
      update({
        labels: has
          ? issue.labels.filter((label) => label !== action.label)
          : [...issue.labels, action.label],
      });
      if (item.multi) return;
      close(`${has ? "Removed" : "Added"} ${action.label}`);
      return;
    }
    const url = `https://linear.app/raphael/issue/${issue.id.toLowerCase()}/${slug(issue.title)}`;
    const branch = `raphael/${issue.id.toLowerCase()}-${slug(issue.title)}`;
    const text =
      action.what === "id" ? issue.id : action.what === "url" ? url : branch;
    const message =
      action.what === "id"
        ? `"${issue.id}" copied to clipboard`
        : action.what === "url"
          ? "Copied issue link to clipboard"
          : "Branch name copied to clipboard";
    void navigator.clipboard?.writeText(text).catch(() => {});
    close(message);
  }

  function runModShortcut(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (!event.metaKey && !event.ctrlKey) return false;
    const match = rootItems(issue, issues, "").find((item) => {
      const shortcut = item.shortcut;
      if (!shortcut?.mod) return false;
      const key = shortcut.keys[0];
      return (
        !!shortcut.shift === event.shiftKey &&
        (event.code === CODE[key] || event.key.toLowerCase() === key)
      );
    });
    if (!match) return false;
    event.preventDefault();
    select(match);
    return true;
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (runModShortcut(event)) return;

    if (event.ctrlKey && !event.metaKey) {
      if (event.key === "k" || event.key === "p") {
        event.preventDefault();
        event.stopPropagation();
        move(-1, event.repeat);
        return;
      }
      if (event.key === "j" || event.key === "n") {
        event.preventDefault();
        move(1, event.repeat);
        return;
      }
    }

    if (showNumbers && /^[0-9]$/.test(event.key) && !event.metaKey) {
      const item = view.items.find((entry) => entry.num === Number(event.key));
      if (item) {
        event.preventDefault();
        select(item);
      }
      return;
    }

    const last = Math.max(view.items.length - 1, 0);
    const input = event.currentTarget;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (event.metaKey || event.altKey) patchFrame({ focus: last });
        else move(1, event.repeat);
        return;
      case "ArrowUp":
        event.preventDefault();
        if (event.metaKey || event.altKey) patchFrame({ focus: 0 });
        else move(-1, event.repeat);
        return;
      case "Home":
        event.preventDefault();
        patchFrame({ focus: 0 });
        return;
      case "End":
        event.preventDefault();
        patchFrame({ focus: last });
        return;
      case "PageUp":
      case "PageDown": {
        event.preventDefault();
        const page = Math.floor((SIZE.cap - SIZE.input) / SIZE.item);
        const step = event.key === "PageUp" ? -page : page;
        patchFrame({ focus: Math.min(last, Math.max(0, focus + step)) });
        return;
      }
      case "ArrowLeft":
        if (nested && input.selectionStart === 0 && input.selectionEnd === 0) {
          event.preventDefault();
          back();
        }
        return;
      case "ArrowRight":
        if (
          active?.action.type === "page" &&
          input.selectionStart === input.value.length
        ) {
          event.preventDefault();
          drill(active.action.page);
        }
        return;
      case "Backspace":
        if (frame.query.length > 0) return;
        event.preventDefault();
        if (nested) back();
        else if (issue) clearContext();
        return;
      case "Escape":
        event.preventDefault();
        close();
        return;
      case "Tab":
        event.preventDefault();
        if (event.shiftKey && nested) back();
        else if (!event.shiftKey && active?.action.type === "page") {
          drill(active.action.page);
        } else move(event.shiftKey ? -1 : 1, false);
        return;
      case "Enter":
        event.preventDefault();
        if (active) select(active);
        return;
      default:
        return;
    }
  }

  return (
    <div className={styles.stage} data-open={open ? "true" : "false"}>
      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close command menu"
          tabIndex={-1}
          onClick={() => close()}
        />
      ) : null}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            className={styles.menu}
            role="dialog"
            aria-label="Command menu"
            aria-modal="true"
            initial={
              skipEnter.current ? false : { opacity: 0, scale: 0.98, height }
            }
            animate={{ opacity: 1, scale: dip ? 0.98 : 1, height }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 2500, damping: 100 },
            }}
            transition={{
              height: reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 20000, damping: 500 },
              scale: dip
                ? { duration: reduce ? 0 : 0.08 }
                : { type: "spring", stiffness: 1500, damping: 100 },
              opacity: { type: "spring", stiffness: 1500, damping: 100 },
            }}
          >
            {issue ? (
              <div className={styles.title}>
                <div className={styles.chip}>
                  <span className={styles.chipId}>{issue.id}</span>{" "}
                  {issue.title}
                  {!nested && frame.query.length === 0 ? (
                    <>
                      {" "}
                      <button
                        type="button"
                        className={styles.clear}
                        title="Clear context"
                        tabIndex={-1}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={clearContext}
                      >
                        <Keycap borderless>⌫</Keycap>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
            <label className={styles.field}>
              <span className="sr-only">{placeholder(frame.page, issue)}</span>
              <input
                ref={inputRef}
                className={styles.input}
                type="search"
                role="combobox"
                aria-expanded="true"
                aria-controls={`${baseId}-list`}
                aria-activedescendant={
                  active ? `${baseId}-${active.id}` : undefined
                }
                aria-autocomplete="list"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder={placeholder(frame.page, issue)}
                value={frame.query}
                onChange={(event) =>
                  patchFrame({ query: event.target.value, focus: 0 })
                }
                onKeyDown={onKeyDown}
              />
            </label>
            {view.rows.length > 0 ? (
              <div
                ref={listRef}
                id={`${baseId}-list`}
                className={styles.list}
                role="listbox"
                aria-multiselectable={frame.page === "labels" || undefined}
              >
                {view.rows.map((row) => {
                  if (row.type === "header") {
                    return (
                      <div
                        key={row.id}
                        className={styles.header}
                        role="presentation"
                      >
                        {row.group === ISSUE_GROUP && issue ? (
                          <>
                            <span className={styles.chipId}>{issue.id}</span>
                            &nbsp;{issue.title}
                          </>
                        ) : (
                          row.group
                        )}
                      </div>
                    );
                  }
                  if (row.type === "empty") {
                    return (
                      <div key="empty" className={styles.empty}>
                        {row.text}
                      </div>
                    );
                  }
                  const item = row.item;
                  const focused = row.index === focus;
                  return (
                    <button
                      key={item.id}
                      id={`${baseId}-${item.id}`}
                      ref={focused ? activeRef : undefined}
                      type="button"
                      className={styles.item}
                      role="option"
                      tabIndex={-1}
                      aria-selected={item.selected ?? false}
                      data-focused={focused ? "true" : undefined}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseMove={() => {
                        if (!focused) patchFrame({ focus: row.index });
                      }}
                      onClick={() => select(item)}
                    >
                      {item.multi ? (
                        <span
                          className={styles.checkbox}
                          data-checked={item.selected ? "true" : undefined}
                        >
                          {item.selected ? <Icons.check /> : null}
                        </span>
                      ) : null}
                      {item.icon ? (
                        <span className={styles.icon}>{item.icon}</span>
                      ) : null}
                      <span className={styles.labels}>
                        {item.parent ? (
                          <span className={styles.parent}>
                            {item.parent}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              aria-hidden="true"
                            >
                              <path
                                d="M4.5 3 7.5 6l-3 3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        ) : null}
                        <span className={styles.label}>{item.label}</span>
                        {item.detail ? (
                          <span className={styles.detail}>{item.detail}</span>
                        ) : null}
                      </span>
                      {item.selected && !item.multi ? (
                        <span className={styles.selected}>
                          <Icons.check />
                        </span>
                      ) : null}
                      {showNumbers && item.num !== undefined ? (
                        <Keys shortcut={{ keys: [String(item.num)] }} />
                      ) : item.shortcut ? (
                        <Keys shortcut={item.shortcut} />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        ) : (
          <button
            key="reopen"
            type="button"
            className={styles.reopen}
            onClick={() => {
              setStack([{ page: "root", query: "", focus: 0 }]);
              setOpen(true);
            }}
          >
            <span>{notice ?? "Command menu"}</span>
            <Keys shortcut={{ keys: ["k"], mod: true }} />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
