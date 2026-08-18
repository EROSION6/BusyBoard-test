import { useEffect, useState } from 'react'
import { Joyride, type EventData, type Step } from 'react-joyride'

interface EconomyTourProps {
	run: boolean
	onFinish: () => void
}

const steps: Step[] = [
	{
		target: 'body',
		placement: 'center',
		content:
			'Добро пожаловать в раздел заявки на поставку! Тут вы можете создать заявку на поставку и она появится в вашем кабинете или выгрузить уже созданные, чтобы на основе них создать отгрузки.',
	},
	{
		target: '.tour-download-btn',
		placement: 'bottom',
		content:
			'Нажмите на эту кнопку, чтобы подтянуть актуальные заявки на поставку.',
	},
	{
		target: '.tour-create-btn',
		placement: 'bottom',
		content:
			'Супер! Теперь давайте создадим свою собственную заявку на поставку!',
	},
	{
		target: 'body',
		placement: 'center',
		content:
			'Вы большой молодец! Поздравляем с освоением нового раздела, надеюсь, он принесет вам много пользы!',
	},
]

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
			options={{
				zIndex: 999999,
				primaryColor: '#429EFF',
				arrowColor: '#429EFF',
				showProgress: true,
				buttons: ['back', 'primary'],
			}}
			styles={{
				tooltip: {
					width: isMobile ? 'calc(100vw - 32px)' : 365,
					maxWidth: 'calc(100vw - 32px)',
					borderRadius: 14,
					padding: 0,
					boxShadow: '0 8px 30px rgba(0, 0, 0, 0.16)',
					paddingTop: 10,
				},

				tooltipContent: {
					padding: '16px 20px 4px',
					fontSize: 14,
					lineHeight: 1.45,
				},

				tooltipFooter: {
					padding: '4px 20px 12px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				},

				overlay: {
					transition: 'opacity 250ms ease',
				},

				buttonBack: {
					border: 'none',
					outline: 'none',
					boxShadow: 'none',
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
