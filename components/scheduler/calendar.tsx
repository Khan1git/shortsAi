"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const scheduledVideos: Record<string, { title: string; platform: string; time: string }[]> = {
  "2026-02-10": [
    { title: "5 AI Tools You Need", platform: "TikTok", time: "10:00" },
    { title: "Python Tips #42", platform: "YouTube", time: "14:00" },
  ],
  "2026-02-11": [
    { title: "Morning Routine", platform: "Instagram", time: "08:00" },
  ],
  "2026-02-12": [
    { title: "Budget Travel Hacks", platform: "TikTok", time: "12:00" },
    { title: "Minimalist Living", platform: "Instagram", time: "18:00" },
  ],
  "2026-02-14": [
    { title: "Valentine's Day Ideas", platform: "Facebook", time: "09:00" },
  ],
  "2026-02-16": [
    { title: "Weekly Motivation", platform: "TikTok", time: "07:00" },
    { title: "Coding Challenge", platform: "YouTube", time: "15:00" },
    { title: "Fitness Update", platform: "Instagram", time: "17:00" },
  ],
  "2026-02-18": [
    { title: "Stock Market Update", platform: "Facebook", time: "10:00" },
  ],
  "2026-02-20": [
    { title: "Quick Recipe: Pasta", platform: "TikTok", time: "12:00" },
  ],
  "2026-02-22": [
    { title: "Weekend Workout", platform: "Instagram", time: "08:00" },
  ],
}

const platformColors: Record<string, string> = {
  TikTok: "bg-foreground text-background",
  Instagram: "bg-pink-500 text-pink-50",
  YouTube: "bg-red-500 text-red-50",
  Facebook: "bg-blue-600 text-blue-50",
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export function SchedulerCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">{monthName}</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8 bg-transparent" onClick={prevMonth}>
              <ChevronLeft className="size-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="icon" className="size-8 bg-transparent" onClick={nextMonth}>
              <ChevronRight className="size-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {DAYS.map((day) => (
            <div key={day} className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {days.map((day, idx) => {
            const dateKey = day
              ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              : null
            const events = dateKey ? scheduledVideos[dateKey] || [] : []
            const isToday = day === 10 && month === 1 && year === 2026

            return (
              <div
                key={`day-${idx}`}
                className={`min-h-[80px] lg:min-h-[120px] bg-card p-1.5 ${
                  day === null ? "bg-muted/50" : ""
                } ${isToday ? "ring-2 ring-primary ring-inset" : ""}`}
              >
                {day !== null && (
                  <>
                    <span
                      className={`text-xs font-medium ${
                        isToday
                          ? "bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center"
                          : "text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.title}
                          className="group cursor-pointer"
                        >
                          <Badge
                            className={`w-full justify-start text-[10px] font-normal truncate px-1 py-0 h-5 ${platformColors[event.platform]}`}
                          >
                            {event.time} {event.title}
                          </Badge>
                        </div>
                      ))}
                      {events.length > 2 && (
                        <span className="text-[10px] text-muted-foreground pl-1">
                          +{events.length - 2} more
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
