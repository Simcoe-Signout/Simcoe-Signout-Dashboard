[
  {
    name: 'Sushi Robot',
    description: 'A cute little robot capable of bringing food to your table',
    location: 'Diramio\'s room',
    category: 'robots'
  },
  {
    name: '1114 Test Robot',
    description: 'This robot hates the Sushi Robot, because Sushi Robot is stopping the students from learning FRC Code',
    location: 'Robot Storage Closet',
    category: 'robots'
  }
].each { |resource| Resource.find_or_create_by!(resource) }