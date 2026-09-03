/**
 * Xtrail AI Industrial Platform - Client API Service
 * Interacts with FastAPI backend routes
 */

export interface LiveTelemetry {
  oee_index: number;
  power_savings_pct: number;
  vibration_rms: number;
  active_nodes: number;
  total_nodes: number;
  uptime_pct: number;
  timestamp: string;
  node_status: string;
}

export interface PlantSummary {
  plant_id: string;
  plant_name: string;
  state: string;
  city: string;
  machine_count: number;
  active_machines: number;
  avg_oee: number;
  total_power_kw: number;
  alerts_count: number;
  status: string;
}

export interface ROICalculationInput {
  plant_name: string;
  sector?: string;
  machine_count: number;
  avg_machine_age_years: number;
  current_oee_pct: number;
  downtime_hours_per_month: number;
  hourly_downtime_cost_inr: number;
  monthly_energy_bill_inr: number;
}

export interface ROICalculationOutput {
  plant_name: string;
  sector: string;
  current_oee_pct: number;
  projected_oee_pct: number;
  oee_improvement_pts: number;
  monthly_downtime_savings_inr: number;
  monthly_energy_savings_inr: number;
  total_monthly_savings_inr: number;
  annual_savings_inr: number;
  estimated_hardware_setup_cost_inr: number;
  payback_period_months: number;
  three_year_net_roi_pct: number;
  breakdown: Record<string, any>;
}

export interface PlantAssessmentPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  plant_location: string;
  machine_count: number;
  primary_challenge: string;
  preferred_date?: string;
}

export interface PlantAssessmentResult {
  id: string;
  status: string;
  message: string;
  company: string;
  scheduled_team: string;
  created_at: string;
}

const API_BASE = "/api/v1";

export async function fetchLiveTelemetry(): Promise<LiveTelemetry> {
  const res = await fetch(`${API_BASE}/telemetry/live`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch live telemetry: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchPlants(): Promise<PlantSummary[]> {
  const res = await fetch(`${API_BASE}/telemetry/plants`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch plants: ${res.statusText}`);
  }
  return res.json();
}

export async function calculateROI(input: ROICalculationInput): Promise<ROICalculationOutput> {
  const res = await fetch(`${API_BASE}/roi/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`Failed to calculate ROI: ${res.statusText}`);
  }
  return res.json();
}

export async function submitPlantAssessment(payload: PlantAssessmentPayload): Promise<PlantAssessmentResult> {
  const res = await fetch(`${API_BASE}/contact/assessment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit plant assessment: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchProducts(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  return res.json();
}
