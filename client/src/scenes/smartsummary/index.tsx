// src/scenes/SmartSummary/index.tsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import axios from "axios";

const SmartSummary = () => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const fetchInsight = async () => {
    if (!kpiData) return;
    setLoading(true);

    const chartData = kpiData[0].monthlyData.map(
      ({ month, revenue, expenses }) => ({
        month,
        revenue,
        expenses,
        profit: revenue - expenses,
      })
    );

    const prompt = `
You are an actuarial capital risk strategist at a global financial institution. You’ve received structured monthly financial KPI data spanning a 12-month fiscal period, including revenue, expenses, and profit. Your mandate is to synthesize this time series into a precision-calibrated internal report suitable for presentation to CROs, ICAAP committees, and senior solvency and capital governance stakeholders.

${JSON.stringify(chartData, null, 2)}

Transform the data into exactly five analytically distinct bullet paragraphs.

Each paragraph must:
- Be formatted as a standalone bullet (use markdown list style)
- Contain **exactly 10 logically evolving sentences**, totaling **between 140–160 words** per bullet
- Use formal, insight-dense, statistically rigorous prose consistent with internal actuarial or ICAAP-grade memoranda
- Begin with a hard technical insight — not general summary or contextual setup
- Progress sentence-by-sentence to reveal materially significant structural, statistical, or financial observations
- Avoid all repetition, summary phrasing, filler, or vague commentary

Your analysis must reflect a balance of:
- Statistical behavior: standard deviation, coefficient of variation (CV), z-scores, skewness, kurtosis, regime shifts, changepoints
- Correlation structures: revenue-expense dependencies, structural decoupling, signal noise
- Volatility characteristics: drawdown/recovery slopes, tail concentration, margin compression, volatility clustering
- Capital risk implications: profit concentration, solvency drag, expense asymmetry, early-warning thresholds, buffer recalibration

Embed numerical evidence where appropriate, and ensure every metric is paired with a strategic interpretation or capital-planning implication. Do not simply describe or restate the data. Every line must contain actionable insight, signal amplification, or a forward-looking model consideration.

Strict formatting requirements:
- Return **only** the five markdown-formatted bullet paragraphs (no headings, titles, or extra lines)
- Separate each bullet paragraph with a **single empty line**
- The overall output should total **approximately 300**

This is not a descriptive summary — it is a professional internal risk briefing. Do not use redundant language, use more direct capital calls, and link between the metrics if. Write as if your output will inform capital provisioning, solvency recalibration, or internal model governance under ORSA or Pillar II reporting. Each paragraph must provide material justification for financial interpretation or decision-making under uncertainty.
`;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/gpt/summary`,
        { prompt }
      );
      setInsight(response.data.result);
    } catch (err) {
      console.error("Failed to fetch GPT insight:", err);
      setInsight("Failed to load insights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!insight) return;
    navigator.clipboard.writeText(insight).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (kpiData) fetchInsight();
  }, [kpiData]);

  return (
    <Box px={2} py={2}>
      <DashboardBox
        width="100%"
        height="calc(100vh - 100px)"
        p="1.5rem"
        borderRadius="12px"
        bgcolor={palette.grey[800]}
        boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
        sx={{ overflowY: "auto" }}
      >
        <FlexBetween mb="1.5rem" gap="1rem" flexWrap="wrap">
          <Box>
            <Typography variant="h3" gutterBottom>
              AI-Powered Smart Summary
            </Typography>
            <Typography variant="h6" color={palette.grey[700]}>
              Automatically generated summary based on monthly financial KPIs
            </Typography>
          </Box>

          <Box display="flex" gap="0.75rem" flexWrap="wrap">
            <Button
              onClick={fetchInsight}
              sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[400],
                "&:hover": {
                  backgroundColor: palette.grey[300],
                },
              }}
            >
              Regenerate Insight
            </Button>

            <Button
              onClick={copyToClipboard}
              disabled={!insight}
              sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[400],
                "&:hover": {
                  backgroundColor: palette.grey[300],
                },
              }}
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </Box>
        </FlexBetween>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box p="0.5rem 0 0 0">
            <Typography
              variant="h6"
              color={palette.grey[300]}
              whiteSpace="pre-line"
              sx={{
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {insight || "No insights generated yet."}
            </Typography>
          </Box>
        )}
      </DashboardBox>
    </Box>
  );
};

export default SmartSummary;
