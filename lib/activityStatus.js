export function getActivityStatus(profileId) {
  const bdTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }))
  const hour = bdTime.getHours()
  const seed = (profileId * 2654435761) % 100
  let onlineChance, activeChance
  if (hour >= 0 && hour < 7)        { onlineChance = 1;  activeChance = 8  }
  else if (hour >= 7 && hour < 9)   { onlineChance = 4;  activeChance = 18 }
  else if (hour >= 9 && hour < 12)  { onlineChance = 7;  activeChance = 28 }
  else if (hour >= 12 && hour < 14) { onlineChance = 12; activeChance = 38 }
  else if (hour >= 14 && hour < 17) { onlineChance = 7;  activeChance = 28 }
  else if (hour >= 17 && hour < 22) { onlineChance = 15; activeChance = 42 }
  else                               { onlineChance = 5;  activeChance = 22 }
  if (seed < onlineChance)                          return { text: "Online now",       color: "#22c55e" }
  if (seed < onlineChance + activeChance)           return { text: "Active today",     color: "#f97316" }
  if (seed < onlineChance + activeChance + 30)      return { text: "Active this week", color: "#9ca3af" }
  return                                                   { text: "Recently active",  color: "#6b7280" }
}
