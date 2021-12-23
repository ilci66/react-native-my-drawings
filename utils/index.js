export const getDrawings = () => {
  setLoading(true)
  fetch('http://192.168.1.4:3002/drawings')
    .then(res => res.json())
    .then(async data => {
      await setDrawingData(data)
      await setLoading(false)
      console.log("just to make sure it's getting data ==>",data[0].title)
      console.log('got all the drawings')
    })
}
// gonna have me a break
export const mapDrawingsToCards = (drawingData) => {
  if(setDrawingData !== undefined) {
    return <ScrollView 
    // fixed the very slow scrolling 
    removeClippedSubviews={true}>  
    {drawingData.map((drawing, i) => {
      return(
        <Card key={i}>
        <Card.Title>{drawing.title}</Card.Title>
        <Card.Divider />
        {drawing.shape == "h" && <Card.Image style={styles.imageHorizontal}source={{ uri: `${drawing.url}.jpg` }} />}
        {drawing.shape == "v" && <Card.Image style={styles.imageVertical}source={{ uri: `${drawing.url}.jpg` }} />}
        {drawing.shape == "r" && <Card.Image style={styles.imageRect}source={{ uri: `${drawing.url}.jpg` }} />}
        <Text style={{ marginBottom: 10 }}>
          {drawing.description}
        </Text>
        <TouchableOpacity 
        onPress={getDrawings} 
        style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight}
      >
        <Text 
          style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>
            Edit
        </Text>
      </TouchableOpacity>
        </Card>
      )
    })}</ScrollView>
  }
}