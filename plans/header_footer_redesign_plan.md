# Header and Footer Redesign Plan

This plan details the UI/UX enhancements to make the Header and Footer components more modern, beautiful, and engaging, fitting the cosmic/cultivation platform theme.

## Proposed Changes

### Components Layer
#### Header.tsx
- Add a sticky glassmorphic navigation bar that changes height and background blur upon scroll.
- Add a top cosmic glowing line `bg-gradient-to-r from-transparent via-primary/50 to-transparent`.
- Logo: refined gradient text and star icon with `hover:scale-105` and a glowing shadow.
- Upgrade the Search Bar with better focus states (`focus:ring-primary/50`), animated width expansion (`transition-all duration-300 hover:w-[105%] focus-within:w-[105%]`), and polished borders.
- Improve nav icons with a beautiful glassmorphic hover: `hover:bg-slate-800/80 hover:text-qi-teal`.
- Redesign the "Đăng nhập" button to have a beautiful cosmic glow effect when hovered using `bg-gradient-to-r from-primary to-qi-teal`.

#### Footer.tsx
- Background aesthetic: Use a sleek radial gradient `bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background-dark to-background-dark`.
- Redesign the social media buttons with beautiful gradient borders on hover and transform scaling (`hover:-translate-y-1 hover:shadow-primary/30`).
- Enhance the Link lists (Thể loại, Hỗ trợ) with an animated left-border and translate-x text effect on hover (`hover:translate-x-1 hover:text-qi-teal`).
- Add a "Theo dõi tin tức" section with a stylish email input field and subscribe button with a gradient glow.
- Refine the bottom section with beautiful typography for the copyright text and links.
