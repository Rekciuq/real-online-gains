import { ReactNode } from "react";

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <p>App layout</p>
      {children}
    </div>
  );
}
