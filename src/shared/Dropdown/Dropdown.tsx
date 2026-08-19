import classNames from 'classnames'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import down from '../assets/arrow.svg'
import s from './Dropdown.module.scss'

interface DropdownProps {
	label?: string
	value?: string
	placeholder?: string
	options?: Array<{ label: string; value: string }>
	children?: ReactNode
	className?: string
	onChange?: (value: string) => void
	disabled?: boolean
	size?: 'sm' | 'md' | 'lg'
	required?: boolean
}

export const Dropdown = ({
	label,
	value,
	placeholder = 'Выбрать',
	options = [],
	children,
	className,
	onChange,
	disabled = false,
	size = 'md',
	required = false,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedLabel, setSelectedLabel] = useState(
		options.find(opt => opt.value === value)?.label || value || '',
	)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = (option: { label: string; value: string }) => {
		setSelectedLabel(option.label)
		setIsOpen(false)
		onChange?.(option.value)
	}

	const dropdownClass = classNames(
		s.dropdown,
		s[size],
		{
			[s.open]: isOpen,
			[s.disabled]: disabled,
		},
		className,
	)

	return (
		<div className={s.wrapper} ref={dropdownRef}>
			{label && (
				<label className={s.label}>
					{required && <span className={s.requiredStar}>*</span>}
					{label}
				</label>
			)}

			<div className={dropdownClass}>
				<button
					className={s.trigger}
					onClick={() => !disabled && setIsOpen(!isOpen)}
					type='button'
					disabled={disabled}
				>
					<span
						className={classNames(s.value, {
							[s.placeholder]: !selectedLabel,
						})}
					>
						{selectedLabel || placeholder}
					</span>
					<img
						src={down}
						alt=''
						className={classNames(s.arrow, { [s.rotated]: isOpen })}
					/>
				</button>

				{isOpen && (
					<div className={s.menu}>
						{children
							? children
							: options.map(option => (
									<button
										key={option.value}
										className={classNames(s.option, {
											[s.selected]: option.value === value,
										})}
										onClick={() => handleSelect(option)}
										type='button'
									>
										{option.label}
									</button>
								))}
					</div>
				)}
			</div>
		</div>
	)
}
