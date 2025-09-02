const ReviewCard = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.userInfo}>
        <Image source={{uri: review.userAvatar}} style={styles.avatar} />
        <Text style={styles.userName}>{review.userName}</Text>
        <Text style={styles.date}>{review.date}</Text>
      </View>
      
      <View style={styles.rating}>
        {/* Yıldız rating component */}
      </View>
      
      <Text style={styles.reviewText}>{review.comment}</Text>
      
      {review.images && (
        <ScrollView horizontal>
          {/* Yorum resimleri */}
        </ScrollView>
      )}
    </View>
  );
};