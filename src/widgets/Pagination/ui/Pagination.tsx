import classNames from 'classnames'
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
}

export const Pagination = ({
	currentPage,
	totalPages,
	pageSize,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 50, 100],
	className,
}: PaginationProps) => {
	const getPageNumbers = () => {
		const pages = []
		const maxVisible = 5

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 5; i++) {
					pages.push(i)
				}
				pages.push('...')
				pages.push(totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1)
				pages.push('...')
				for (let i = totalPages - 4; i <= totalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push('...')
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i)
				}
				pages.push('...')
				pages.push(totalPages)
			}
		}

		return pages
	}

	return (
		<div className={classNames(s.pagination, className)}>
			<div className={s.controls}>
				<button
					className={s.arrow}
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
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
						>
							{page}
						</button>
					),
				)}

				<button
					className={s.arrow}
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
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
					<select
						value={pageSize}
						onChange={e => onPageSizeChange(Number(e.target.value))}
					>
						{pageSizeOptions.map(size => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	)
}
