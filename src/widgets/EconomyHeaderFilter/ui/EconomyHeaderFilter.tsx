import { Button } from '../../../shared/Button/Button'
import bookmark from '../../../shared/assets/ic_bookmark_24.svg'
import download from '../../../shared/assets/ic_download 24.svg'
import erase from '../../../shared/assets/ic_erase_24.svg'
import plus from '../../../shared/assets/ic_plus 24.svg'
import search from '../../../shared/assets/ic_search_24.svg'
import setting from '../../../shared/assets/ic_setting 24 (1).svg'
import s from './EconomyHeaderFilter.module.scss'

export const EconomyHeaderFilter = () => {
	return (
		<div className={s.container}>
			<div className={s.left}>
				<Button variant='primary' className={s.filter}>
					Фильтр
				</Button>

				<div className={s.show_btn}>
					<Button
						variant='outline'
						size='md'
						icon={<img src={setting} alt='' />}
					/>
				</div>

				<div className={s.btn_icon}>
					<Button variant='icon' size='md'>
						<img src={bookmark} alt='' />
					</Button>

					<Button variant='icon' size='md'>
						<img src={erase} alt='' />
					</Button>

					<Button variant='icon' size='md'>
						<img src={search} alt='' />
					</Button>
				</div>
			</div>

			<div className={s.right}>
				<Button
					variant='primary'
					size='md'
					icon={<img src={download} alt='' />}
					className={`${s.downloadBtn} tour-download-btn`}
				>
					Загрузить по API
				</Button>

				<Button
					variant='primary'
					size='md'
					icon={<img src={plus} alt='' />}
					className={`${s.createBtn} tour-create-btn`}
				>
					Заявка на поставку
				</Button>
				<Button
					variant='outline'
					size='md'
					icon={<img src={setting} alt='' />}
				/>
			</div>
		</div>
	)
}
