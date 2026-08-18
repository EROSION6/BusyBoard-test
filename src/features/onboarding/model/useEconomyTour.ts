import { useEffect, useState } from 'react'

export const useEconomyTour = () => {
	const [runTour, setRunTour] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setRunTour(true)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	const finishTour = () => {
		setRunTour(false)
	}

	return {
		runTour,
		finishTour,
	}
}
