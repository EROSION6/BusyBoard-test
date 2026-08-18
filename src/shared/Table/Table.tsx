import classNames from 'classnames'
import { type ReactNode } from 'react'
import filter from '../assets/ic_filter 16.svg'
import s from './Table.module.scss'

interface Column<T> {
	key: keyof T | string
	title: string
	width?: string | number
	render?: (item: T) => ReactNode
	align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
	columns: Column<T>[]
	data: T[]
	className?: string
	onRowClick?: (item: T) => void
	loading?: boolean
	emptyText?: string
}

export const Table = <T extends Record<string, any>>({
	columns,
	data,
	className,
	onRowClick,
	loading = false,
	emptyText = 'Нет данных',
}: TableProps<T>) => {
	const tableClass = classNames(s.table, className)

	const getCellValue = (item: T, column: Column<T>) => {
		if (column.render) {
			return column.render(item)
		}
		return item[column.key as keyof T]
	}

	if (loading) {
		return (
			<div className={s.loading}>
				<div className={s.spinner} />
				<span>Загрузка...</span>
			</div>
		)
	}

	if (!data.length) {
		return (
			<div className={s.empty}>
				<span>{emptyText}</span>
			</div>
		)
	}

	return (
		<div className={s.tableWrapper}>
			<table className={tableClass}>
				<thead>
					<tr>
						{columns.map(column => (
							<th
								key={String(column.key)}
								style={{
									width: column.width,
									textAlign: column.align || 'left',
								}}
							>
								<div className={s.header_th}>
									{column.title}
									<img src={filter} alt='' />
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr
							key={index}
							onClick={() => onRowClick?.(item)}
							className={onRowClick ? s.clickable : ''}
						>
							{columns.map(column => (
								<td
									key={String(column.key)}
									style={{ textAlign: column.align || 'left' }}
								>
									{getCellValue(item, column)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
