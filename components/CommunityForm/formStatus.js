export const getFormStatus = ({ errors, values }) => {
  const getPercentage = (values) => {
    const size = Object.keys(values).length
    const percentage = Object.values(values).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )

    return Math.floor((percentage / size) * 100)
  }

  const getStepOne = () => {
    const stepOne = {
      haveName: !errors.name && !!values.name ? 1 : 0,
      haveSlug: !errors.slug && !!values.slug ? 1 : 0,
      haveType: !errors.type && !!values.type ? 1 : 0,
      haveCategory: !errors.category && !!values.category ? 1 : 0,
      haveTags: !errors.tags && !!values.tags ? 1 : 0,
      haveDescription: !errors.description && !!values.description ? 1 : 0
    }

    const isParticipant = !!values.globalProgram.isParticipant
    const haveName = !!values.globalProgram.name

    if (isParticipant && haveName) stepOne.haveGlobalProgram = 1
    if (isParticipant && !haveName) stepOne.haveGlobalProgram = 0

    return stepOne
  }

  const getStepTwo = () => {
    const { city, state, country } = values.location

    if (values.model === 'online') return { haveCountry: country ? 1 : 0 }

    return {
      haveCountry: country ? 1 : 0,
      haveState: state ? 1 : 0,
      haveCity: city ? 1 : 0
    }
  }

  const getStepThree = () => {
    const stepThree = {
      haveMembers: !errors.members && !!values.members ? 1 : 0,
      haveOwner: !errors.owner && !!values.owner ? 1 : 0
    }

    if (values.managers[0]) {
      for (const { email } of values.managers) {
        stepThree[email] = 1
      }
    }

    return stepThree
  }

  const getStepFour = () => {
    const stepFour = {}

    values.links.forEach((link, index) => {
      const { links: listOfErrors = [] } = errors

      const haveLink = !!link.url
      const haveError = !!listOfErrors[index]

      if (!haveLink) return (stepFour[`link${index}`] = 0)
      if (haveLink && haveError) return (stepFour[`link${index}`] = 0)

      return (stepFour[`link${index}`] = 1)
    })
    return stepFour
  }

  const steps = {
    BasicInfos: getStepOne(),
    Location: getStepTwo(),
    People: getStepThree(),
    Links: getStepFour()
  }

  const stepsPercentage = {
    BasicInfos: getPercentage(steps.BasicInfos),
    Location: getPercentage(steps.Location),
    People: getPercentage(steps.People),
    Links: getPercentage(steps.Links)
  }
  const totalPercentage = getPercentage({
    ...steps.BasicInfos,
    ...steps.Location,
    ...steps.People,
    ...steps.Links
  })

  return {
    stepsPercentage,
    totalPercentage
  }
}
