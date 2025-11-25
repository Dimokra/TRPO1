
export async function apiLoadStudents() {
  const response = await fetch("/api/students");
  if (!response.ok) {
    return [];
  }
  return await response.json();
}

export async function apiCreateStudent(student: any) {
  const payload = {
    ...student,
    birthday: student.birthday instanceof Date ? student.birthday.toISOString() : student.birthday
  };

  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error("Failed to save student: " + text);
  }

  return await response.json();
}

export async function apiDeleteStudent(id: number) {
  const response = await fetch(`/api/students/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error("Failed to delete student: " + text);
  }

  return true;
}
