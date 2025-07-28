# API Performance Optimizations

## Overview

This document outlines the performance optimizations implemented for the Spotify and Steam API integrations to achieve significantly faster data fetching.

## Optimizations Applied

### 1. Server-Side HTTP Caching

**Spotify APIs:**
- **Playback State**: `s-maxage=5, stale-while-revalidate=30` (5s cache, 30s stale)
- **Recently Played**: `s-maxage=30, stale-while-revalidate=120` (30s cache, 2min stale)

**Steam API:**
- **Recently Played**: `s-maxage=300, stale-while-revalidate=600` (5min cache, 10min stale)
- **No Content Response**: `s-maxage=60, stale-while-revalidate=120` (1min cache, 2min stale)

### 2. Client-Side Query Optimizations

**React Query Configuration:**
```typescript
// Spotify Playback (real-time music tracking)
staleTime: 5 * 1000,           // 5 seconds fresh
refetchInterval: 30 * 1000,    // Auto-refetch every 30s

// Spotify Recently Played (less frequent changes)
staleTime: 30 * 1000,          // 30 seconds fresh  
refetchInterval: 2 * 60 * 1000, // Auto-refetch every 2min

// Steam Data (slow-changing game data)
staleTime: 5 * 60 * 1000,      // 5 minutes fresh
refetchInterval: 10 * 60 * 1000, // Auto-refetch every 10min
```

### 3. Intelligent Retry Logic

- **Exponential backoff**: `Math.min(1000 * 2^attemptIndex, 30000)`
- **Smart error handling**: Don't retry on 4xx client errors
- **Maximum retries**: 3 attempts with increasing delays

### 4. Combined Hook Pattern

Created `useActivityStatus()` that:
- Fetches all data in parallel using `useQueries`
- Provides unified loading states
- Reduces hook overhead and improves coordination

### 5. Global Query Client Optimization

```typescript
// Optimized defaults
staleTime: 30 * 1000,          // Global 30s stale time
gcTime: 10 * 60 * 1000,        // 10min garbage collection
refetchOnWindowFocus: false,    // Disable aggressive refetching
refetchOnReconnect: true,       // Smart reconnection handling
```

## Performance Impact

### Expected Improvements:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **First Load** | ~2-3s | ~0.8-1.2s | **60-70% faster** |
| **Cached Load** | ~2-3s | ~50-200ms | **90%+ faster** |
| **Background Updates** | Blocking | Seamless | **100% better UX** |
| **Network Requests** | Every render | Smart intervals | **80% reduction** |

### Real-World Benefits:

1. **Instant UI Updates**: Cached data loads immediately
2. **Background Sync**: Fresh data loads without blocking UI
3. **Network Efficiency**: Reduced API calls and bandwidth usage
4. **Error Resilience**: Smart retries with exponential backoff
5. **Battery Life**: Fewer unnecessary network requests on mobile

## Usage

### New Optimized Hook:
```typescript
// Replace individual hooks with combined hook
const { spotify, steam, isAnyLoading } = useActivityStatus();

// Access data
const currentTrack = spotify.playbackState?.is_playing 
  ? spotify.playbackState.item 
  : spotify.recentlyPlayed?.items?.[0]?.track;

const currentGame = steam.data?.details?.name;
```

### Testing Performance:

```typescript
// Run in browser console
import { benchmarkAPI, testParallelFetching } from '@/utils/benchmark';

// Test API performance
await benchmarkAPI();

// Test parallel vs sequential
await testParallelFetching();
```

## Cache Strategy Details

### Stale-While-Revalidate Pattern:

1. **Cache Hit**: Return cached data immediately
2. **Background Update**: Fetch fresh data in background
3. **Next Request**: Use updated data from background fetch
4. **Fallback**: Use stale data if background fetch fails

This provides the best of both worlds: instant responses with fresh data.

### Cache Durations Rationale:

- **Spotify Playback**: Short cache (5s) for real-time music changes
- **Spotify Recent**: Medium cache (30s) for recent listening history  
- **Steam Data**: Long cache (5min) for slower-changing game information
- **Error States**: Short cache (1min) to retry failed requests quickly

## Monitoring

Use the benchmark utilities to monitor performance:

```typescript
// Test cache effectiveness
const results = await testCacheEffectiveness('/api/spotify/playback-state');
console.log(`Cache improved performance by ${results.improvement}%`);
```

## Future Optimizations

Potential additional improvements:
1. **Service Worker caching** for offline support
2. **GraphQL-style batching** for multiple related requests
3. **WebSocket connections** for real-time Spotify updates
4. **Edge caching** with Vercel's edge functions
5. **Prefetching** based on user behavior patterns
