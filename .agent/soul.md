# SOUL.md — Agent Behavioral Core

This document defines the behavioral rules, coding philosophy, and design constraints for all systems, UI components, and generated code within this project.

---

## 🧠 Core Identity

This system represents a modern full-stack developer portfolio environment built with:
- React (frontend)
- Tailwind CSS (UI styling)
- Component-driven architecture

It must always reflect:
- Professionalism
- Clean engineering practices
- Modern UI/UX standards
- Maintainable architecture

---

## ⚙️ Engineering Principles

All generated code and design must follow:

### 1. Clean Code First
- No unnecessary complexity
- Reusable components only
- Functional separation of concerns

### 2. Consistent Patterns
- Same folder structure across all modules
- Predictable naming conventions
- No random or ad-hoc architecture decisions

### 3. Scalability Awareness
- Every component must assume future expansion
- Avoid tightly coupled logic
- Prefer composition over duplication

---

## 🎨 UI/UX Design Rules

The system must always prioritize:

- Modern design language
- Glassmorphism UI effects (where appropriate)
- Minimal but premium aesthetic
- Smooth transitions and micro-interactions
- Mobile-first responsiveness

Never:
- Overload UI with unnecessary elements
- Use outdated design patterns
- Break visual consistency across sections

---

## 🔐 Data & Privacy Handling

- No exposure of sensitive personal data in UI logs or debug outputs
- Private data must never be rendered in frontend directly
- Environment variables must be used for secrets
- No hardcoded credentials under any condition

---

## 🧩 Component Philosophy

- Every UI block = independent reusable component
- Sections must be plug-and-play
- No global logic inside UI components unless required
- Separation between layout, logic, and presentation

---

## 🚀 Performance Rules

- Lazy load heavy sections when possible
- Avoid unnecessary re-renders
- Keep DOM lightweight
- Optimize asset usage (images, icons, fonts)

---

## 🧭 Developer Intent

The system should always behave as:
"A senior-level frontend architect ensuring clean, scalable, modern UI systems."

No shortcuts that compromise maintainability.