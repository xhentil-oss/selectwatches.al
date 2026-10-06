const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const BagIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
);
export const MenuIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const PlusIcon = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);
export const HomeIcon = () => (
  <svg {...base} width={15} height={15} aria-hidden="true"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>
);
export const UserIcon = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
);
export const PhoneIcon = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const MailIcon = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const PinIcon = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
const big = { ...base, width: 26, height: 26, strokeWidth: 1.3 };
export const ShieldIcon = () => (
  <svg {...big} aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
);
export const TruckIcon = () => (
  <svg {...big} aria-hidden="true"><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const GiftIcon = () => (
  <svg {...big} aria-hidden="true"><rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v8h14v-8M12 8v13" /><path d="M12 8c-1.5-3-5-3.5-5-1s5 1 5 1zm0 0c1.5-3 5-3.5 5-1s-5 1-5 1z" /></svg>
);
export const InstagramIcon = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
);
