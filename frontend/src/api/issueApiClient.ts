import { Issue, IssueFormData } from "../types/kanbanTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createIssue = async (formData: IssueFormData): Promise<Issue> => {
  const response = await fetch(`${API_BASE_URL}/api/issues/create-issue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to create issue");
  }

  return response.json();
};

export const getAllIssues = async (): Promise<Issue[]> => {
  const response = await fetch(`${API_BASE_URL}/api/issues`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all issues");
  }

  return response.json();
};

export const getIssueByCode = async (issueCode: string): Promise<Issue> => {
  const response = await fetch(`${API_BASE_URL}/api/issues/${issueCode}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch issue");
  }

  return response.json();
};

export const updateIssueByFormData = async (
  issueData: IssueFormData
): Promise<Issue> => {
  const response = await fetch(
    `${API_BASE_URL}/api/issues/${issueData.issueCode}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(issueData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update User Profile");
  }

  return response.json();
};

export const updateIssue = async (issue: Issue): Promise<Issue> => {
  const response = await fetch(
    `${API_BASE_URL}/api/issues/${issue.issueCode}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(issue),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update User Profile");
  }

  return response.json();
};

export const deleteIssue = async (issue: Issue): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/api/issues/${issue.issueCode}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "json/application",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error during issue deletion");
  }

  return response.json();
};
