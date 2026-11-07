export const PORTAL = "https://myaccount.myfnpf.com.fj/ProMISMSS/wfmLoginExternal.aspx";
export const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=fj.com.myaccount.myfnpf&hl=en";
export const APP_STORE = "https://apps.apple.com/fj/app/myfnpf/id1302760657";
export const PHONE = { label: "5857 / 330 7811", href: "tel:5857" };
export const EMAIL = { label: "information@fnpf.com.fj", href: "mailto:information@fnpf.com.fj" };

/** Free-licence Unsplash photo, hotlinked through next/image. */
export const unsplash = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
/** Free-licence Pexels photo. */
export const pexels = (id: number, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const NEW_NAV: NavItem[] = [
  { label: "Home", href: "/new-members" },
  {
    label: "Why FNPF",
    href: "/new-members#about",
    children: [
      { label: "Who must join", href: "/new-members#join" },
      { label: "Voluntary membership", href: "/new-members#join" },
      { label: "Your two accounts", href: "/new-members#about" },
      { label: "What your membership covers", href: "/new-members#about" },
    ],
  },
  {
    label: "Join FNPF",
    href: "/new-members#join",
    children: [
      { label: "Register as an employee", href: "/new-members#steps" },
      { label: "Join as a voluntary member", href: "/new-members#join" },
      { label: "Register your child", href: "/new-members#join" },
      { label: "Rejoin FNPF", href: "#" },
      { label: "Documents you need", href: "/new-members#steps" },
      { label: "Nominate your beneficiaries", href: "#" },
      { label: "Forms and downloads", href: "#" },
    ],
  },
  {
    label: "Your savings",
    href: "/new-members#about",
    children: [
      { label: "How contributions work", href: "/new-members#about" },
      { label: "Grow your savings", href: "#" },
      { label: "Ways to pay", href: "#" },
      { label: "Retirement calculator", href: "#" },
    ],
  },
  {
    label: "Go digital",
    href: "/new-members#app",
    children: [
      { label: "myFNPF app", href: "/new-members#app" },
      { label: "Online portal", href: PORTAL },
      { label: "myFund SMS (*567#)", href: "/new-members#app" },
      { label: "Joint FNPF/FRCS ID card", href: "#" },
    ],
  },
  {
    label: "Help",
    href: "#",
    children: [
      { label: "FAQs", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Office locations", href: "#" },
    ],
  },
];

export const MEMBER_NAV: NavItem[] = [
  { label: "Home", href: "/members" },
  {
    label: "My account",
    href: "/members#tasks",
    children: [
      { label: "Online portal", href: PORTAL },
      { label: "myFNPF app", href: "/members#app" },
      { label: "myFund SMS (*567#)", href: "#" },
      { label: "Statements and balances", href: PORTAL },
      { label: "Update my details", href: PORTAL },
      { label: "Nominations", href: PORTAL },
    ],
  },
  {
    label: "Withdrawals",
    href: "/members#about",
    children: [
      { label: "Education", href: "#" },
      { label: "Medical", href: "#" },
      { label: "Housing", href: "#" },
      { label: "Funeral", href: "#" },
      { label: "Unemployment", href: "#" },
      { label: "Full withdrawal", href: "#" },
      { label: "Track my application", href: PORTAL },
    ],
  },
  {
    label: "Grow my savings",
    href: "#",
    children: [
      { label: "Additional contributions", href: "#" },
      { label: "Ways to pay", href: "#" },
      { label: "Retirement calculator", href: "#" },
      { label: "FNPF gift card", href: "#" },
    ],
  },
  {
    label: "Retirement",
    href: "/members#retire",
    children: [
      { label: "Plan your retirement", href: "/members#retire" },
      { label: "Life pension", href: "/members#retire" },
      { label: "Term annuity", href: "/members#retire" },
      { label: "DrawDown account", href: "/members#retire" },
      { label: "Pensioner services", href: PORTAL },
    ],
  },
  {
    label: "Member news",
    href: "/members#news",
    children: [
      { label: "Member updates", href: "/members#news" },
      { label: "Newsletter", href: "/members#news" },
      { label: "Annual Member Forum", href: "/members#news" },
    ],
  },
  {
    label: "Help",
    href: "#",
    children: [
      { label: "FAQs", href: "#" },
      { label: "Forms and downloads", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Office locations", href: "#" },
    ],
  },
];

/** Shared corporate links (utility bar, mobile menu, footer). */
export const CORPORATE: NavLink[] = [
  { label: "Employers", href: "#" },
  { label: "Investments", href: "#" },
  { label: "About Us", href: "#" },
  { label: "News & Media", href: "#" },
];
