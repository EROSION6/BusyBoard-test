import classNames from 'classnames'
import { type MouseEventHandler, type ReactNode } from 'react'
import s from './Button.module.scss'

interface ButtonProps {
	children?: ReactNode
	variant?: 'primary' | 'icon' | 'outline' | 'invisible'
	size?: 'sm' | 'md' | 'lg'
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	type?: 'button' | 'submit' | 'reset'
	icon?: ReactNode
}

export const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	className,
	onClick,
	type = 'button',
	icon,
	...props
}: ButtonProps) => {
	const buttonClass = classNames(
		s.button,
		s[variant],
		s[size],
		{
			[s.iconOnly]: !children && icon,
		},
		className,
	)

	return (
		<button {...props} className={buttonClass} onClick={onClick} type={type}>
			{icon && <span className={s.icon}>{icon}</span>}
			{children && <span className={s.text}>{children}</span>}
		</button>
	)
}
