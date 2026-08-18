import { Button } from '../../shared/Button/Button'
import { EconomyFilters } from '../../widgets/EconomyFilters/ui/EconomyFilters'
import { EconomyHeaderFilter } from '../../widgets/EconomyHeaderFilter/ui/EconomyHeaderFilter'
import { EconomyTable } from '../../widgets/EconomyTable/ui/EconomyTable'
import s from './Economy.module.scss'

const Economy = () => {
	return (
		<div className='economy-container'>
			<div className={s.request}>Заявки на поставку</div>

			<div className={s.container}>
				<div className='economy-header-filter'>
					<EconomyHeaderFilter />
				</div>

				<EconomyFilters />

				<div className={s.filter_btn}>
					<Button variant='invisible' className='tour-download-btn'>
						Фильтр первый
					</Button>

					<Button variant='primary' className='tour-create-btn'>
						Фильтр первый
					</Button>
				</div>

				<EconomyTable />
			</div>
		</div>
	)
}

export default Economy
