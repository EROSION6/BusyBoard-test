import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import s from './Pagination.module.scss'

interface PaginationProps {
	currentPage: number
	totalPages: number
	pageSize: number
	totalItems?: number
	onPageChange: (page: number) => void
	onPageSizeChange?: (size: number) => void
	pageSizeOptions?: number[]
	className?: string
	minPages?: number
}

export const Pagination = ({
	currentPage,
	totalPages,
	pageSize,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 50, 100],
	className,
	minPages = 5,
}: PaginationProps) => {
	const [isSizeOpen, setIsSizeOpen] = useState(false)
	const sizeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sizeRef.current && !sizeRef.current.contains(event.target as Node)) {
				setIsSizeOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const displayTotalPages = Math.max(totalPages, minPages)
	const progressPercent =
		displayTotalPages > 1 ? (currentPage / displayTotalPages) * 100 : 100

	const getPageNumbers = () => {
		const pages: (number | string)[] = []
		const maxVisible = 5

		if (displayTotalPages <= maxVisible) {
			for (let i = 1; i <= displayTotalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 5; i++) {
					pages.push(i)
				}
				pages.push('...')
				pages.push(displayTotalPages)
			} else if (currentPage >= displayTotalPages - 2) {
				pages.push(1)
				pages.push('...')
				for (let i = displayTotalPages - 4; i <= displayTotalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push('...')
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i)
				}
				pages.push('...')
				pages.push(displayTotalPages)
			}
		}

		return pages
	}

	const handleSelectSize = (size: number) => {
		onPageSizeChange?.(size)
		setIsSizeOpen(false)
	}

	return (
		<div className={classNames(s.pagination, className)}>
			<div className={s.progressBar} style={{ width: `${progressPercent}%` }} />

			<div className={s.row}>
				<div className={s.controls}>
					<button
						className={s.arrow}
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						type='button'
					>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
							<path
								d='M10 12L6 8L10 4'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>

					{getPageNumbers().map((page, index) =>
						page === '...' ? (
							<span key={`dots-${index}`} className={s.dots}>
								...
							</span>
						) : (
							<button
								key={page}
								className={classNames(s.page, {
									[s.active]: page === currentPage,
								})}
								onClick={() => onPageChange(page as number)}
								disabled={(page as number) > totalPages}
								type='button'
							>
								{page}
							</button>
						),
					)}

					<button
						className={s.arrow}
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						type='button'
					>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
							<path
								d='M6 12L10 8L6 4'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>

				{onPageSizeChange && (
					<div className={s.pageSize}>
						<span>Строк на странице</span>

						<div className={s.sizeDropdown} ref={sizeRef}>
							<button
								type='button'
								className={s.sizeTrigger}
								onClick={() => setIsSizeOpen(prev => !prev)}
							>
								{pageSize}
								<svg
									width='10'
									height='10'
									viewBox='0 0 16 16'
									fill='none'
									className={classNames(s.sizeArrow, {
										[s.rotated]: isSizeOpen,
									})}
								>
									<path
										d='M4 6L8 10L12 6'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>

							{isSizeOpen && (
								<div className={s.sizeMenu}>
									{pageSizeOptions.map(size => (
										<button
											key={size}
											type='button'
											className={classNames(s.sizeOption, {
												[s.sizeOptionActive]: size === pageSize,
											})}
											onClick={() => handleSelectSize(size)}
										>
											{size}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
