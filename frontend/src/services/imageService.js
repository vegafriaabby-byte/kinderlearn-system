import redBall from "../assets/activities/red-ball.webp";
import blueBall from "../assets/activities/blue-ball.jpg";
import greenBall from "../assets/activities/green-ball.jpg";
import animals from "../assets/activities/animals.jpg";

const activityImages = {
  "red-ball": redBall,
  "blue-ball": blueBall,
  "green-ball": greenBall,
  animals: animals
};

export function getActivityImage(imageName) {
  return activityImages[imageName] || null;
}ss