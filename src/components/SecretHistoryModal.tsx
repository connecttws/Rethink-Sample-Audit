"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Search,
  Lock,
  Unlock,
  KeyRound,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Building,
  Dumbbell,
  Utensils,
  Activity,
  User,
  Phone,
  Calendar,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import {
  HistoryRecord,
  getAuditHistory,
  fetchAuditHistoryAsync,
} from "@/lib/history-storage";

interface SecretHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory?: "business" | "fitness" | "nutrition" | "physio" | "all";
}

const MASTER_PASSWORD = "Welcome@123";

export function SecretHistoryModal({
  isOpen,
  onClose,
  activeCategory = "all",
}: SecretHistoryModalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Current Device Auditor from localStorage
  const [currentAuditorName, setCurrentAuditorName] = useState<string>("");

  // History Records & Filtering State
  const [historyList, setHistoryList] = useState<HistoryRecord[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  // Set default tab when opened & load records
  useEffect(() => {
    if (isOpen) {
      setSelectedTab(activeCategory || "all");
      setSearchQuery("");
      setVisibleCount(5);
      setAuthError("");
      setPasswordInput("");

      // Read local auditor profile from localStorage
      if (typeof window !== "undefined") {
        const storedName =
          localStorage.getItem("tws_auditor_name") ||
          localStorage.getItem("tws_active_auditor");
        if (storedName) {
          try {
            const parsed = JSON.parse(storedName);
            setCurrentAuditorName(parsed.name || storedName);
          } catch {
            setCurrentAuditorName(storedName);
          }
        }
      }

      // 1. Initial fast local load
      setHistoryList(getAuditHistory());

      // 2. Background database sync from PostgreSQL tws_sample_audit
      setIsLoading(true);
      fetchAuditHistoryAsync(activeCategory || "all")
        .then((records) => {
          setHistoryList(records);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, activeCategory]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === MASTER_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid access key. Please enter the correct master password.");
    }
  };

  // Filtered list based on category tab & search query
  const filteredList = useMemo(() => {
    return historyList.filter((item) => {
      // 1. Tab filter
      if (selectedTab !== "all" && item.type !== selectedTab) {
        return false;
      }

      // 2. Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.clientName.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.auditorName && item.auditorName.toLowerCase().includes(q)) ||
        (item.locality && item.locality.toLowerCase().includes(q)) ||
        item.bandTitle.toLowerCase().includes(q)
      );
    });
  }, [historyList, selectedTab, searchQuery]);

  const currentVisibleItems = filteredList.slice(0, visibleCount);
  const hasMore = visibleCount < filteredList.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* 1. PASSWORD CHALLENGE MODAL */}
      {!isAuthenticated ? (
        <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white space-y-6">
          {/* Accent glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none bg-emerald-500/20" />

          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider font-sans">
                  Master Authorization
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  TWS Confidential Diagnostic History
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                Enter Master Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="Enter security key"
                  autoFocus
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white font-mono placeholder:text-slate-500 outline-none pr-12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock History Records</span>
            </button>
          </form>
        </div>
      ) : (
        /* 2. UNLOCKED SECRET AUDIT HISTORY MODAL */
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white">
          {/* Modal Header */}
          <div className="px-6 py-4.5 border-b border-slate-800 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-xs">
                <Image
                  src="/tws-logo.png"
                  alt="TWS"
                  width={100}
                  height={38}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div className="border-l border-slate-700 pl-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black uppercase tracking-wider text-white font-sans">
                    TWS Diagnostic History
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Database Synced
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Database Table: <span className="text-emerald-400">tws_sample_audit</span> · Audited Client Records
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Lock Master Access"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Tabs Bar */}
          <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/70 flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Audits", icon: Activity },
              { id: "business", label: "Business / Lifestyle", icon: Building },
              { id: "fitness", label: "Fitness & Biomechanics", icon: Dumbbell },
              { id: "nutrition", label: "Clinical Nutrition", icon: Utensils },
              { id: "physio", label: "Physio / Clinical", icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const count =
                tab.id === "all"
                  ? historyList.length
                  : historyList.filter((x) => x.type === tab.id).length;
              const isActive = selectedTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedTab(tab.id);
                    setVisibleCount(5);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md font-bold"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-black/30 text-white" : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="px-6 py-3 border-b border-slate-800 bg-black/20">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(5);
                }}
                placeholder="Search by client name, auditor name, WhatsApp phone number, Ref ID or location..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs text-white placeholder:text-slate-500 outline-none font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Audit Records List */}
          <div className="p-6 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-800/60">
            {currentVisibleItems.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">
                  {searchQuery ? "No audit records match your search" : "No audit records in this category yet"}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {searchQuery
                    ? "Try another keyword or select a different category tab."
                    : "Submit a client diagnostic intake to view real-time records here."}
                </p>
              </div>
            ) : (
              currentVisibleItems.map((item) => {
                const reportUrl = `/r/${encodeURIComponent(item.id)}`;

                const badgeBg =
                  item.type === "business"
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : item.type === "fitness"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : item.type === "nutrition"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-teal-500/20 text-teal-300 border-teal-500/30";

                const isCurrentAuditor =
                  currentAuditorName &&
                  item.auditorName &&
                  item.auditorName.trim().toLowerCase() === currentAuditorName.trim().toLowerCase();

                return (
                  <div
                    key={item.id}
                    className="pt-3 first:pt-0 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-white/5 p-3 rounded-2xl transition-colors"
                  >
                    <div className="space-y-1.5 min-w-0">
                      {/* Audited Person Name & Category */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-sm sm:text-base text-white font-sans group-hover:text-emerald-400 transition-colors">
                          {item.clientName}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeBg}`}
                        >
                          {item.typeBadge}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {item.score} / {item.maxScore} PTS
                        </span>
                      </div>

                      {/* Meta: Phone, Date, Location & Auditor Tag */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{item.phone}</span>
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{item.date}</span>
                        </span>

                        {item.locality && (
                          <>
                            <span className="text-slate-600">·</span>
                            <span className="truncate max-w-xs">{item.locality}</span>
                          </>
                        )}

                        {/* Auditor Attribution Tag */}
                        {item.auditorName && (
                          <>
                            <span className="text-slate-600">·</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                                isCurrentAuditor
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs"
                                  : "bg-slate-800 text-slate-300 border border-slate-700"
                              }`}
                            >
                              <User className="w-3 h-3 text-slate-400" />
                              <span>
                                Auditor: {item.auditorName}
                                {isCurrentAuditor ? " (You)" : ""}
                              </span>
                            </span>
                          </>
                        )}

                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 text-[10px]">Ref #{item.id}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Link
                        href={reportUrl}
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer"
                      >
                        <span>View Report</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer with "View More (+5 Records)" Button */}
          <div className="px-6 py-3.5 border-t border-slate-800 bg-black/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <span>
              Showing {Math.min(visibleCount, filteredList.length)} of {filteredList.length}{" "}
              records
            </span>

            {hasMore ? (
              <button
                type="button"
                onClick={handleViewMore}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <span>View More (+5 Records)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[11px] text-slate-500">
                All records loaded for this selection
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
