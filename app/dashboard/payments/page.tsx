"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw
} from "lucide-react";

export default function PaymentsPage() {
  const [filterBy, setFilterBy] = useState("all");
  const [timeRange, setTimeRange] = useState("30days");

  // Sample payment data - replace with actual data from Convex
  const payments = [
    {
      id: 1,
      type: "received",
      amount: 600,
      fee: 30,
      netAmount: 570,
      description: "Wedding Photography Session",
      client: "Sarah Johnson",
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "Credit Card",
      transactionId: "txn_abc123"
    },
    {
      id: 2,
      type: "paid",
      amount: 4800,
      fee: 240,
      netAmount: 4560,
      description: "E-commerce Website Development",
      expert: "Marcus Chen",
      date: "2024-01-10",
      status: "completed",
      paymentMethod: "Bank Transfer",
      transactionId: "txn_def456"
    },
    {
      id: 3,
      type: "received",
      amount: 1040,
      fee: 52,
      netAmount: 988,
      description: "Brand Identity Design",
      client: "Elena Rodriguez",
      date: "2024-01-08",
      status: "processing",
      paymentMethod: "Credit Card",
      transactionId: "txn_ghi789"
    },
    {
      id: 4,
      type: "paid",
      amount: 960,
      fee: 48,
      netAmount: 912,
      description: "Corporate Video Editing",
      expert: "David Kim",
      date: "2024-01-05",
      status: "failed",
      paymentMethod: "PayPal",
      transactionId: "txn_jkl012"
    }
  ];

  // Sample stats
  const stats = [
    {
      title: "Total Earned",
      value: "$12,840",
      change: "+15.2% this month",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Total Spent",
      value: "$8,420",
      change: "+8.3% this month", 
      icon: CreditCard,
      color: "blue"
    },
    {
      title: "Platform Fees",
      value: "$642",
      change: "5% of earnings",
      icon: TrendingUp,
      color: "orange"
    },
    {
      title: "Net Balance",
      value: "$4,420",
      change: "+22.1% this month",
      icon: TrendingUp,
      color: "green"
    }
  ];

  const filterOptions = [
    { value: "all", label: "All Payments" },
    { value: "received", label: "Received" },
    { value: "paid", label: "Paid" },
    { value: "processing", label: "Processing" },
    { value: "failed", label: "Failed" }
  ];

  const timeRanges = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 3 Months" },
    { value: "1year", label: "Last Year" }
  ];

  const filteredPayments = payments.filter(payment => {
    if (filterBy === "all") return true;
    if (filterBy === "received" || filterBy === "paid") {
      return payment.type === filterBy;
    }
    return payment.status === filterBy;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "processing":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <RefreshCw className="w-4 h-4 text-white/50" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "processing":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "failed":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-black tracking-widest text-white">
            PAYMENTS
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-white/50"></div>
          <p className="text-white/70 tracking-wider">
            Track your earnings, expenses, and transaction history
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-white/30 p-6 rounded-lg relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-orange-400" />
                    <TrendingUp className="w-4 h-4 text-white/50" />
                  </div>
                  <h3 className="text-2xl font-black tracking-wider text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-white/80 text-sm font-bold tracking-wider mb-2">
                    {stat.title}
                  </p>
                  <p className="text-orange-400 text-xs tracking-wide">
                    {stat.change}
                  </p>
                </div>
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-orange-400/10 rounded-full transform translate-x-8 -translate-y-8"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/50 border border-white/30 p-6 rounded-lg space-y-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Payment Type Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-white/50" />
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFilterBy(option.value)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-bold tracking-wider transition-all duration-200
                      ${filterBy === option.value
                        ? 'bg-orange-400/20 border border-orange-400/50 text-orange-400'
                        : 'bg-white/10 border border-white/30 text-white/80 hover:bg-white/20'
                      }
                    `}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Time Range Filter */}
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-white/50" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 bg-black/50 border border-white/30 rounded-lg
                         text-white focus:border-orange-400 focus:outline-none
                         tracking-wider font-mono text-sm"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-blue-400/20 border border-blue-400/50 rounded-lg
                         text-blue-400 text-sm font-bold tracking-wider
                         hover:bg-blue-400/30 transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Payments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-900/50 border border-white/30 p-6 rounded-lg relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {/* Payment Info */}
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${payment.type === 'received' 
                        ? 'bg-green-400/20 border border-green-400/30' 
                        : 'bg-blue-400/20 border border-blue-400/30'
                      }
                    `}>
                      <DollarSign className={`
                        w-6 h-6 
                        ${payment.type === 'received' ? 'text-green-400' : 'text-blue-400'}
                      `} />
                    </div>
                    <div>
                      <h3 className="text-white font-black tracking-wider">
                        {payment.description}
                      </h3>
                      <p className="text-white/70 text-sm tracking-wide">
                        {payment.type === 'received' 
                          ? `From ${payment.client}` 
                          : `To ${payment.expert}`
                        }
                      </p>
                      <p className="text-white/50 text-xs tracking-wide">
                        {payment.transactionId}
                      </p>
                    </div>
                  </div>

                  {/* Amount and Status */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`
                        text-2xl font-black tracking-wider
                        ${payment.type === 'received' ? 'text-green-400' : 'text-blue-400'}
                      `}>
                        {payment.type === 'received' ? '+' : '-'}${payment.amount.toLocaleString()}
                      </span>
                      {getStatusIcon(payment.status)}
                    </div>
                    <span className={`
                      text-xs font-bold tracking-wider px-3 py-1 rounded-full border uppercase
                      ${getStatusColor(payment.status)}
                    `}>
                      {payment.status}
                    </span>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase mb-1">
                      Date
                    </p>
                    <p className="text-white font-bold tracking-wide">
                      {formatDate(payment.date)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase mb-1">
                      Method
                    </p>
                    <p className="text-white font-bold tracking-wide">
                      {payment.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase mb-1">
                      Fee
                    </p>
                    <p className="text-red-400 font-bold tracking-wide">
                      -${payment.fee}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-wider uppercase mb-1">
                      Net Amount
                    </p>
                    <p className="text-orange-400 font-bold tracking-wide">
                      ${payment.netAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Background Element */}
              <motion.div
                className={`
                  absolute top-0 right-0 w-32 h-32 rounded-full transform translate-x-16 -translate-y-16
                  ${payment.type === 'received' ? 'bg-green-400/5' : 'bg-blue-400/5'}
                `}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results State */}
        {filteredPayments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <CreditCard className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 font-bold tracking-wider">
              No payments found
            </p>
            <p className="text-white/40 text-sm tracking-wide mt-2">
              Your payment history will appear here
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}