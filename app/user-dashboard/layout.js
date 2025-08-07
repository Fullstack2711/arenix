import StyledComponentsRegistry from '../lib/registry';

export default function DashboardLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      {children}
    </StyledComponentsRegistry>
  );
}