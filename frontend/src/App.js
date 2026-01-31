import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export default function App() {
    const [name, setName] = useState("");
    const [students, setStudents] = useState([]);

    async function load() {
        const res = await fetch(`${API_BASE}/api/students`);
        const data = await res.json();
        setStudents(data);
    }

    async function addStudent(e) {
        e.preventDefault();
        if (!name.trim()) return;

        await fetch(`${API_BASE}/api/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        setName("");
        load();
    }

    useEffect(() => { load(); }, []);

    return (
        <div style={{ fontFamily: "Arial", maxWidth: 600, margin: "40px auto" }}>
            <h1>Compose Practice</h1>

            <form onSubmit={addStudent} style={{ display: "flex", gap: 8 }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Student name"
                    style={{ flex: 1, padding: 10 }}
                />
                <button style={{ padding: "10px 16px" }}>Add</button>
            </form>

            <h2 style={{ marginTop: 20 }}>Students</h2>
            <ul>
                {students.map((s) => (
                    <li key={s.id}>{s.name}</li>
                ))}
            </ul>
        </div>
    );
}
