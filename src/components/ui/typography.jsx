import { cn } from '@/lib/utils'

const Typography = ({
  variant = 'span',
  tag = variant,
  className,
  children,
  ...props
}) => {
  const classNames = {
    h1: 'scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl',
    h2: 'scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl',
    h3: 'scroll-m-12 text-2xl font-semi-bold tracking-tight lg:text-3xl',
    h4: 'scroll-m-10 text-xl font-medium tracking-tight lg:text-2xl',
    h5: 'scroll-m-8 text-lg font-normal tracking-tight lg:text-xl',
    h6: 'scroll-m-6 text-base font-normal tracking-tight lg:text-xl',
    p: 'scroll-m-4 text-sm font-normal tracking-tight lg:text-base',
    span: 'scroll-m-4 text-sm font-normal tracking-tight lg:text-base'
  };

  const Tag = tag != variant ? tag : variant
  const defaultClassName = classNames[variant]
  const combinedClassName = cn(defaultClassName, className)

  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
}

export default Typography