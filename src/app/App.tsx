import { EconomyTour } from '../features/onboarding/ui/EconomyTour'
import { Header } from '../widgets/Header/ui/Header'
import Economy from '../pages/Economy/Economy'
import { useEconomyTour } from '../features/onboarding/model/useEconomyTour'

const App = () => {
	const { runTour, finishTour } = useEconomyTour()

	return (
		<div>
			<Header isTourActive={runTour} />

			<div className='container-pages'>
				<Economy />
			</div>

			<EconomyTour run={runTour} onFinish={finishTour} />
		</div>
	)
}

export default App
