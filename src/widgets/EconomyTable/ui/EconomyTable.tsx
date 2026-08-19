import { useState } from 'react'
import { Table } from '../../../shared/Table/Table'
import { Pagination } from '../../Pagination/ui/Pagination'
import s from './EconomyTable.module.scss'

type EconomyData = {
	id: string
	date: string
	organization: string
	contractor: string
	deliveryNumber: string
	quantity: number
	status: string
	receptionDate: string
	amount: string
	comment: string
}

const mockData = [
	{
		id: '00001',
		date: '01.01.2024',
		organization: 'ИП Иванов Иван Иванович',
		contractor: 'ООО "Название компании"',
		deliveryNumber: '123123123123123',
		quantity: 1,
		status: 'Принят без расхождений',
		receptionDate: '27.07.2024 12:00',
		amount: '100 000,00',
		comment: 'Первый заказ для МП',
	},
	{
		id: '00002',
		date: '01.01.2024',
		organization: 'ИП Иванов Иван Иванович',
		contractor: 'ООО "Название компании"',
		deliveryNumber: '123123123123123',
		quantity: 1,
		status: 'Не зарезервирован',
		receptionDate: 'Время доставки: 4д. 12ч.',
		amount: '100 000,00',
		comment: 'Первый заказ для МП',
	},
	{
		id: '00003',
		date: '02.01.2024',
		organization: 'ООО "Ромашка"',
		contractor: 'ИП Петров Петр Петрович',
		deliveryNumber: '456456456456456',
		quantity: 3,
		status: 'Зарезервирован',
		receptionDate: '28.07.2024 15:30',
		amount: '250 500,50',
		comment: 'Срочный заказ',
	},
	{
		id: '00004',
		date: '03.01.2024',
		organization: 'ООО "Василек"',
		contractor: 'ИП Сидорова Мария Ивановна',
		deliveryNumber: '789789789789789',
		quantity: 2,
		status: 'В пути до МП',
		receptionDate: '29.07.2024 10:00',
		amount: '75 200,00',
		comment: '',
	},
	{
		id: '00005',
		date: '04.01.2024',
		organization: 'ИП Иванов Иван Иванович',
		contractor: 'ООО "Подсолнух"',
		deliveryNumber: '321321321321321',
		quantity: 5,
		status: 'Принят без расхождений',
		receptionDate: '30.07.2024 18:20',
		amount: '500 000,00',
		comment: 'Частичная поставка',
	},
	{
		id: '00006',
		date: '05.01.2024',
		organization: 'ООО "Тюльпан"',
		contractor: 'ИП Козлов Дмитрий Сергеевич',
		deliveryNumber: '654654654654654',
		quantity: 1,
		status: 'Не зарезервирован',
		receptionDate: '31.07.2024 09:00',
		amount: '30 000,00',
		comment: 'Отказ от поставки',
	},
	{
		id: '00007',
		date: '06.01.2024',
		organization: 'ООО "Роза"',
		contractor: 'ИП Смирнова Анна Викторовна',
		deliveryNumber: '987987987987987',
		quantity: 4,
		status: 'Принят с расхождениями',
		receptionDate: '01.08.2024 14:00',
		amount: '180 750,25',
		comment: 'Доп. соглашение №1',
	},
]

const statusColors: Record<string, string> = {
	'Не зарезервирован': '#FF5E5B',
	Зарезервирован: '#FFAA5B',
	'В пути до МП': '#429EFF',
	'Принят без расхождений': '#1AB889',
	'Принят с расхождениями': '#FF5E5B',
}

const hexToRgba = (hex: string, alpha: number) => {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const columns = [
	{ key: 'id', title: '№', width: '70px' },
	{ key: 'date', title: 'ДАТА', width: '100px' },
	{ key: 'organization', title: 'ОРГАНИЗАЦИЯ', width: '200px' },
	{ key: 'contractor', title: 'КОНТРАГЕНТ', width: '200px' },
	{ key: 'deliveryNumber', title: '№ ПОСТАВКИ', width: '150px' },
	{ key: 'quantity', title: 'КОЛ-ВО', width: '80px', align: 'center' as const },
	{
		key: 'status',
		title: 'СТАТУС',
		width: '180px',
		render: (item: EconomyData) => {
			const color = statusColors[item.status] || '#5a6c7d'

			return (
				<span
					className={s.status}
					style={{
						color,
						background: hexToRgba(color, 0.12),
					}}
				>
					{item.status}
				</span>
			)
		},
	},
	{ key: 'receptionDate', title: 'ДАТА ПРИЕМКИ', width: '160px' },
	{
		key: 'amount',
		title: 'СУММА',
		width: '120px',
		align: 'right' as const,
		render: (item: EconomyData) => (
			<span
				style={{
					whiteSpace: 'nowrap',
				}}
			>
				{item.amount} ₽
			</span>
		),
	},
	{ key: 'comment', title: 'КОММЕНТАРИЙ', width: '180px' },
]

export const EconomyTable = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(50)
	const [data] = useState(mockData)

	const totalItems = data.length
	const totalPages = Math.ceil(totalItems / pageSize)
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const currentData = data.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handlePageSizeChange = (size: number) => {
		setPageSize(size)
		setCurrentPage(1)
	}

	const handleRowClick = (item: any) => {
		console.log('Row clicked:', item)
	}

	return (
		<div className={s.container}>
			<Table columns={columns} data={currentData} onRowClick={handleRowClick} />

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				pageSize={pageSize}
				totalItems={totalItems}
				onPageChange={handlePageChange}
				onPageSizeChange={handlePageSizeChange}
				pageSizeOptions={[10, 20, 50, 100]}
			/>
		</div>
	)
}
