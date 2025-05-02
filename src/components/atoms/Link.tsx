export default function Link({ href, className, onClick, children, ...props }: { href: string; className?: string; onClick?: () => void; children: React.ReactNode, props?: any }) {
  return <a href={href} className={className} onClick={onClick} {...props}>{children}</a>
}
