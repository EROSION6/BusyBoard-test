import {
	CONDUCTED_OPTIONS,
	CONTRACTOR_OPTIONS,
	DATE_OPTIONS,
	DELIVERY_OPTIONS,
	ORGANIZATION_OPTIONS,
	PRODUCT_OPTIONS,
	STATUS_OPTIONS,
	WAREHOUSE_OPTIONS,
} from '../../../entities/filters/config/dictionaries'
import { Dropdown } from '../../../shared/Dropdown/Dropdown'
import s from './EconomyFilters.module.scss'

export const EconomyFilters = () => {
	return (
		<div className={s.container}>
			<div className={s.row}>
				<Dropdown
					label='Дата'
					placeholder='Выбрать'
					options={DATE_OPTIONS}
					onChange={value => console.log('Дата:', value)}
					size='md'
				/>

				<Dropdown
					label='Контрагент'
					placeholder='Выбрать'
					options={CONTRACTOR_OPTIONS}
					onChange={value => console.log('Контрагент:', value)}
					size='md'
				/>

				<Dropdown
					label='Организация'
					placeholder='Выбрать'
					options={ORGANIZATION_OPTIONS}
					onChange={value => console.log('Организация:', value)}
					size='md'
				/>

				<Dropdown
					label='Товар'
					placeholder='Выбрать'
					options={PRODUCT_OPTIONS}
					onChange={value => console.log('Товар:', value)}
					size='md'
				/>

				<Dropdown
					label='Склад отправителя'
					placeholder='Выбрать склад'
					options={WAREHOUSE_OPTIONS}
					onChange={value => console.log('Склад отправителя:', value)}
					size='md'
				/>
			</div>

			<div className={s.row}>
				<Dropdown
					label='№ поставки'
					placeholder='Выбрать'
					options={[
						{ label: 'П-001', value: '1' },
						{ label: 'П-002', value: '2' },
						{ label: 'П-003', value: '3' },
						{ label: 'П-004', value: '4' },
						{ label: 'П-005', value: '5' },
					]}
					onChange={value => console.log('№ поставки:', value)}
					size='md'
				/>

				<Dropdown
					label='Способ доставки'
					placeholder='Выбрать'
					options={DELIVERY_OPTIONS}
					onChange={value => console.log('Способ доставки:', value)}
					size='md'
				/>

				<Dropdown
					label='Статус операции'
					placeholder='Выбрать'
					options={STATUS_OPTIONS}
					onChange={value => console.log('Статус операции:', value)}
					size='md'
				/>

				<Dropdown
					label='Склад получателя'
					placeholder='Выбрать'
					options={WAREHOUSE_OPTIONS}
					onChange={value => console.log('Склад получателя:', value)}
					size='md'
				/>

				<Dropdown
					label='Проведено'
					placeholder='Выбрать'
					options={CONDUCTED_OPTIONS}
					onChange={value => console.log('Проведено:', value)}
					size='md'
				/>
			</div>
		</div>
	)
}
