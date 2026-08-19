import { useEffect, useState } from 'react'
import {
	Joyride,
	type EventData,
	type Step,
	type TooltipRenderProps,
} from 'react-joyride'
import IcClose from '../../../shared/assets/ic_close.svg'
import { Button } from '../../../shared/Button/Button'
import styles from './EconomyTour.module.scss'

interface EconomyTourProps {
	run: boolean
	onFinish: () => void
}

const steps: Step[] = [
	{
		target: 'body',
		placement: 'center',
		title: 'Заявки на поставку',
		content:
			'Добро пожаловать в раздел заявки на поставку! Тут вы можете создать заявку на поставку и она появится в вашем кабинете или выгрузить уже созданные, чтобы на основе них создать отгрузки.',
	},
	{
		target: '.tour-download-btn',
		placement: 'bottom',
		title: 'Выгрузка заявок',
		content:
			'Нажмите на эту кнопку, чтобы подтянуть актуальные заявки на поставку.',
	},
	{
		target: '.tour-create-btn',
		placement: 'bottom',
		title: 'Создание заявки',
		content:
			'Супер! Теперь давайте создадим свою собственную заявку на поставку!',
	},
	{
		target: 'body',
		placement: 'center',
		title: 'Готово!',
		content:
			'Вы большой молодец! Поздравляем с освоением нового раздела, надеюсь, он принесет вам много пользы!',
	},
]

const CustomTooltip = ({
	step,
	tooltipProps,
	primaryProps,
	backProps,
	closeProps,
	isLastStep,
	index,
	size,
}: TooltipRenderProps) => {
	return (
		<div {...tooltipProps} className={styles.tooltip}>
			<div className={styles.header}>
				{step.title && <div className={styles.title}>{step.title}</div>}

				<button
					{...closeProps}
					aria-label='Закрыть'
					className={styles.closeButton}
				>
					<img src={IcClose} alt='' />
				</button>
			</div>

			<div className={styles.content}>{step.content}</div>

			<div className={styles.footer}>
				<span className={styles.stepCounter}>
					Шаг {index + 1} из {size}
				</span>

				<div className={styles.buttonsGroup}>
					{index > 0 && (
						<Button {...backProps} variant="outline" size="md" className={styles.button}>
							Назад
						</Button>
					)}

					<Button {...primaryProps} variant='primary' size="md" className={styles.button}>
						{isLastStep ? 'Завершить' : 'Далее'}
					</Button>
				</div>
			</div>
		</div>
	)
}

export const EconomyTour = ({ run, onFinish }: EconomyTourProps) => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const handleEvent = (data: EventData) => {
		console.log('Joyride event:', data)

		if (data.status === 'finished' || data.status === 'skipped') {
			onFinish()
		}
	}

	if (!run) {
		return null
	}

	return (
		<Joyride
			steps={steps}
			run={run}
			onEvent={handleEvent}
			continuous
			tooltipComponent={CustomTooltip}
			options={{
				zIndex: 999999,
				primaryColor: '#429EFF',
				arrowColor: '#429EFF',
				showProgress: true,
				buttons: ['back', 'primary'],
			}}
			styles={{
				tooltip: {
					width: isMobile ? 'calc(100vw - 32px)' : 400,
					maxWidth: 'calc(100vw - 32px)',
					padding: 0,
				},
				overlay: {
					transition: 'opacity 250ms ease',
				},
			}}
			locale={{
				back: 'Назад',
				close: 'Закрыть',
				last: 'Завершить',
				next: 'Далее',
			}}
		/>
	)
}
