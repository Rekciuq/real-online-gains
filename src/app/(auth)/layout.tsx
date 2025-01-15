type AuthLayoutProps = {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (<div><p>Auth layout</p>{children}</div>)
}

export default AuthLayout;
