import { useEffect, useState } from 'react'

export const useEconomyTour = () => {
	const [runTour, setRunTour] = useState(false)

	useEffect(() => {
		const hasSeenTour = localStorage.getItem('economy_tour_completed')

		if (hasSeenTour) return

		const timer = setTimeout(() => {
			setRunTour(true)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	const finishTour = () => {
		localStorage.setItem('economy_tour_completed', 'true')
		setRunTour(false)
	}

	return {
		runTour,
		finishTour,
	}
}
