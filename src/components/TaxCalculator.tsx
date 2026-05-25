"use client";

import { useState } from "react";
import { BRAND_COLOR } from "@/lib/constants";

type TaxType = "vat" | "corporate";

export default function TaxCalculator() {
  const [taxType, setTaxType] = useState<TaxType>("vat");
  const [amount, setAmount] = useState<string>("");
  const [isInclusive, setIsInclusive] = useState(false);

  const numericAmount = parseFloat(amount) || 0;

  // VAT calculations
  const vatRate = 0.05;
  const vatAmount =
    taxType === "vat"
      ? isInclusive
        ? numericAmount - numericAmount / (1 + vatRate)
        : numericAmount * vatRate
      : 0;
  const vatTotal =
    taxType === "vat"
      ? isInclusive
        ? numericAmount
        : numericAmount + vatAmount
      : 0;
  const vatBase =
    taxType === "vat"
      ? isInclusive
        ? numericAmount / (1 + vatRate)
        : numericAmount
      : 0;

  // Corporate Tax calculations
  const ctThreshold = 375000;
  const ctRate = 0.09;
  const ctTaxableIncome =
    taxType === "corporate"
      ? Math.max(0, numericAmount - ctThreshold)
      : 0;
  const ctAmount =
    taxType === "corporate" ? ctTaxableIncome * ctRate : 0;
  const ctEffectiveRate =
    taxType === "corporate" && numericAmount > 0
      ? (ctAmount / numericAmount) * 100
      : 0;

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("ar-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Tax Type Selector */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setTaxType("vat")}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            taxType === "vat"
              ? "text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          style={taxType === "vat" ? { backgroundColor: BRAND_COLOR } : {}}
          aria-pressed={taxType === "vat"}
        >
          ضريبة القيمة المضافة (VAT)
        </button>
        <button
          onClick={() => setTaxType("corporate")}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            taxType === "corporate"
              ? "text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          style={
            taxType === "corporate" ? { backgroundColor: BRAND_COLOR } : {}
          }
          aria-pressed={taxType === "corporate"}
        >
          ضريبة الشركات (Corporate Tax)
        </button>
      </div>

      <div className="p-8">
        {/* Input */}
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            {taxType === "vat" ? "المبلغ (درهم)" : "صافي الأرباح السنوية (درهم)"}
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={taxType === "vat" ? "أدخل المبلغ" : "أدخل صافي الأرباح"}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-[#0A2647] focus:outline-none transition-colors"
            dir="ltr"
            min="0"
            step="0.01"
          />
        </div>

        {/* VAT Options */}
        {taxType === "vat" && (
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isInclusive}
                onChange={(e) => setIsInclusive(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#0A2647] focus:ring-[#0A2647]"
              />
              <span className="text-sm text-gray-700">
                المبلغ شامل الضريبة
              </span>
            </label>
          </div>
        )}

        {/* Results */}
        {numericAmount > 0 && (
          <div
            className="rounded-xl p-6 space-y-4"
            style={{ backgroundColor: `${BRAND_COLOR}08` }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              نتائج الحساب
            </h3>

            {taxType === "vat" ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المبلغ الأساسي</span>
                  <span className="font-semibold text-gray-900">
                    {formatNumber(vatBase)} درهم
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ضريبة القيمة المضافة (5%)</span>
                  <span
                    className="font-semibold"
                    style={{ color: BRAND_COLOR }}
                  >
                    {formatNumber(vatAmount)} درهم
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    الإجمالي
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: BRAND_COLOR }}
                  >
                    {formatNumber(vatTotal)} درهم
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">صافي الأرباح</span>
                  <span className="font-semibold text-gray-900">
                    {formatNumber(numericAmount)} درهم
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">حد الإعفاء</span>
                  <span className="font-semibold text-gray-900">
                    {formatNumber(ctThreshold)} درهم
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الأرباح الخاضعة للضريبة</span>
                  <span className="font-semibold text-gray-900">
                    {formatNumber(ctTaxableIncome)} درهم
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ضريبة الشركات (9%)</span>
                  <span
                    className="font-semibold"
                    style={{ color: BRAND_COLOR }}
                  >
                    {formatNumber(ctAmount)} درهم
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">
                      الضريبة المستحقة
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: BRAND_COLOR }}
                    >
                      {formatNumber(ctAmount)} درهم
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      النسبة الفعلية
                    </span>
                    <span className="text-sm text-gray-500">
                      {ctEffectiveRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          هذه الحاسبة للأغراض التوضيحية فقط ولا تشكل استشارة ضريبية. يرجى
          استشارة مستشار ضريبي معتمد للحصول على مشورة دقيقة.
        </p>
      </div>
    </div>
  );
}
