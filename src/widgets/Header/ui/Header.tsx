import down from '../../../shared/assets/ic_aDown 16.svg'
import book from '../../../shared/assets/ic_book_24.svg'
import check from '../../../shared/assets/ic_check-check_24.svg'
import notification from '../../../shared/assets/ic_notification 24.svg'
import setting from '../../../shared/assets/ic_setting 24.svg'
import logo from '../../../shared/assets/logo.svg'
import star from '../../../shared/assets/star-svgrepo-com 1.svg'
import user from '../../../shared/assets/user.svg'
import s from './Header.module.scss'

interface HeaderProps {
	isTourActive?: boolean
}

const navigation = [
	{
		title: 'Избранное',
		href: '/favorites',
		icon: star,
	},
	{
		title: 'Финансы',
		href: '/finance',
	},
	{
		title: 'Склад',
		href: '/warehouse',
	},
	{
		title: 'Аналитика',
		href: '/analytics',
	},
	{
		title: 'Автоматизация',
		href: '/automation',
	},
]

export const Header = ({ isTourActive = false }: HeaderProps) => {
	return (
		<header className={`${s.container} ${isTourActive ? s.tourActive : ''}`}>
			<div className={s.container_left}>
				<a href='/' className={s.logo}>
					<img src={logo} alt='Логотип' />
				</a>

				<nav className={s.navigation}>
					{navigation.map(({ title, href, icon }) => (
						<a key={href} href={href}>
							{icon && <img src={icon} alt='' />}
							{title}
						</a>
					))}
				</nav>
			</div>

			<div className={s.container_right}>
				<div className={s.btns}>
					<button className={s.setting} type='button'>
						<span>
							<img src={setting} alt='' />
						</span>
						<p>
							Продолжить <br />
							настройку
						</p>
					</button>

					<button className={s.sub} type='button'>
						<span>0</span>
						<p>Для продолжения продлите подписку</p>
					</button>

					<button className={s.check} type='button'>
						<span>
							<img src={check} alt='' />
						</span>
						<p>Чеклист запуска </p>
						<p>2/12</p>
					</button>
				</div>

				<div className={s.right_info}>
					<button className={s.tabs} type='button'>
						ГК ТУЗЕМУН
						<img src={down} alt='' />
					</button>

					<button type='button' aria-label='Уведомления'>
						<img src={notification} alt='' />
					</button>

					<button type='button' aria-label='Справка'>
						<img src={book} alt='' />
					</button>

					<button type='button' aria-label='Профиль'>
						<img src={user} alt='' />
					</button>
				</div>
			</div>
		</header>
	)
}
