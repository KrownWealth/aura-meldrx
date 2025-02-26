"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

export function SearchInput({ placeholder = "Search...", onSearch }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder={placeholder} value={searchTerm} onChange={handleSearch} className="pl-8" />
    </div>
  )
}

