import styles from './styles.module.css'
import cn from 'classnames'

interface Props {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function IconButton({
  className,
  children,
  onClick
}: Props) {
  return (
    <button className={cn(styles.button, className)} onClick={onClick}>{children}</button>
  )
}