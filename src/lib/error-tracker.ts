interface ErrorEntry {
  timestamp: string;
  message: string;
  stack: string;
  url: string;
  method: string;
  userAgent: string;
  type: string;
  duration?: number;
}

const MAX_ERRORS = 100;
const errorBuffer: ErrorEntry[] = [];

export function logError(
  error: Error | string,
  context: {
    url?: string;
    method?: string;
    userAgent?: string;
    type?: string;
    duration?: number;
  } = {}
) {
  const errorEntry: ErrorEntry = {
    timestamp: new Date().toISOString(),
    message: typeof error === "string" ? error : error.message,
    stack: typeof error === "string" ? "N/A" : error.stack || "No stack trace",
    url: context.url || "N/A",
    method: context.method || "N/A",
    userAgent: context.userAgent || "N/A",
    type: context.type || "exception",
    duration: context.duration,
  };

  errorBuffer.unshift(errorEntry);
  if (errorBuffer.length > MAX_ERRORS) {
    errorBuffer.pop();
  }

  console.error("Application Error:", errorEntry);
}

export function getErrors() {
  return errorBuffer;
}

export function getErrorStats() {
  const now = Date.now();
  const stats = {
    total: errorBuffer.length,
    byType: {} as Record<string, number>,
    byPath: {} as Record<string, number>,
    byTime: {
      lastHour: 0,
      last24Hours: 0,
    },
  };

  errorBuffer.forEach((err) => {
    // By Type
    const type = err.type || "exception";
    stats.byType[type] = (stats.byType[type] || 0) + 1;

    // By Path
    try {
      const errUrl = new URL(err.url);
      stats.byPath[errUrl.pathname] = (stats.byPath[errUrl.pathname] || 0) + 1;
    } catch {
      stats.byPath["unknown"] = (stats.byPath["unknown"] || 0) + 1;
    }

    // By Time
    const errTime = new Date(err.timestamp).getTime();
    if (now - errTime < 3600000) stats.byTime.lastHour++;
    if (now - errTime < 86400000) stats.byTime.last24Hours++;
  });

  return stats;
}
