const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing.");
}

export interface HealthResponse {
  status: string;
}

export async function getBackendHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiUrl}/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return response.json();
}