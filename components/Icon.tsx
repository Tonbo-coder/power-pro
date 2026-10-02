type IconName = "play" | "pause" | "close" | "previous" | "next" | "arrow";
export default function Icon({ name }: { name: IconName }) {
  return <svg className="control-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === "play" && <path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none" />}
    {name === "pause" && <path d="M8 5v14M16 5v14" strokeWidth="4" />}
    {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
    {name === "previous" && <path d="m15 5-7 7 7 7" />}
    {name === "next" && <path d="m9 5 7 7-7 7" />}
    {name === "arrow" && <path d="M4 12h16m-6-6 6 6-6 6" />}
  </svg>;
}
