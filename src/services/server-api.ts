import { API_BASE_URL } from "@/constants/api";
import { callMobileApi } from "@/lib/mobile-api";

/** mock adapter */
export async function downloadRecording(recordingUrl: string) {
  return callMobileApi(
    API_BASE_URL,
    `/download-recording?recording_url=${recordingUrl}`,
  );
}

/** mock adapter */
export async function cancelScheduledTask() {
  return callMobileApi(API_BASE_URL, "/api/cancel-scheduled-task", {
    method: "POST",
  });
}

/** mock adapter */
export async function sendManualSMS() {
  return callMobileApi(API_BASE_URL, "/webhook/dashboard/send-sms", {
    method: "POST",
  });
}

/** mock adapter */
export async function dashboardReturnToAI() {
  return callMobileApi(API_BASE_URL, "/webhook/dashboard/return-to-ai", {
    method: "POST",
  });
}

/** mock adapter */
export async function notifyLeadNotification() {
  return callMobileApi(API_BASE_URL, "POST /notify-lead-notification", {
    method: "POST",
  });
}
