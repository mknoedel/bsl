import { ITab } from '../interfaces/index'
import emotionForm from './tabs/emotion'
import trustForm from './tabs/trust'
import timeManagementForm from './tabs/time-management'
import successForm from './tabs/success'
import socialForm from './tabs/social'
import selfForm from './tabs/self'
import schoolForm from './tabs/school'
import nutritionForm from './tabs/nutrition'
import moodForm from './tabs/mood'
import mentalForm from './tabs/mental'
import loveForm from './tabs/love'
import lifestyleForm from './tabs/lifestyle'
import honestyForm from './tabs/honesty'
import funForm from './tabs/fun'
import friendsForm from './tabs/friends'
import fitnessForm from './tabs/fitness'
import fearForm from './tabs/fear'
import familyForm from './tabs/family'
import responsibilityForm from './tabs/responsibility'
import workJobForm from './tabs/work-job'

const tabs: ITab[] = [
  // {"name": "Home", "link": "/", "optional": false},
  {"name": "Emotion", "link": "/tabs/emotion", "optional": true, "form": emotionForm},
  {"name": "Family", "link": "/tabs/family", "optional": true, "form": familyForm},
  {"name": "Fear", "link": "/tabs/fear", "optional": true, "form": fearForm},
  {"name": "Fitness", "link": "/tabs/fitness", "optional": true, "form": fitnessForm},
  {"name": "Friends", "link": "/tabs/friends", "optional": true, "form": friendsForm},
  {"name": "Fun", "link": "/tabs/fun", "optional": true, "form": funForm},
  {"name": "Honesty", "link": "/tabs/honesty", "optional": true, "form": honestyForm},
  {"name": "Lifestyle", "link": "/tabs/lifestyle", "optional": true, "form": lifestyleForm},
  {"name": "Love", "link": "/tabs/love", "optional": true, "form": loveForm},
  {"name": "Mental", "link": "/tabs/mental", "optional": true, "form": mentalForm},
  {"name": "Mood", "link": "/tabs/mood", "optional": true, "form": moodForm},
  {"name": "Nutrition", "link": "/tabs/nutrition", "optional": true, "form": nutritionForm},
  {"name": "Responsibility", "link": "/tabs/responsibility", "optional": true, "form": responsibilityForm},
  {"name": "School", "link": "/tabs/school", "optional": true, "form": schoolForm},
  {"name": "Self", "link": "/tabs/self", "optional": true, "form": selfForm},
  {"name": "Social", "link": "/tabs/social", "optional": true, "form": socialForm},
  {"name": "Success", "link": "/tabs/success", "optional": true, "form": successForm},
  {"name": "Trust", "link": "/tabs/trust", "optional": true, "form": trustForm},
  {"name": "Time Management", "link": "/tabs/time-management", "optional": true, "form": timeManagementForm},
  {"name": "Work Job", "link": "/tabs/work-job", "optional": true, "form": workJobForm},
  // {"name": "Results", "link": "/results", "optional": false},
]

export default tabs