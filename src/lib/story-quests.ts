export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  reasoningPrompt: string;
}

export interface StoryNode {
  id: string;
  title: string;
  content: string;
  image: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingType?: "great" | "good" | "okay" | "bad";
  endingTitle?: string;
  endingSummary?: string;
  lesson?: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  ageRange: string;
  estimatedTime: string;
  themes: string[];
  skills: string[];
  nodes: StoryNode[];
  isLocked?: boolean;
}

export const stories: Story[] = [
  {
    id: "viral-video",
    title: "Going Viral",
    description: "Your funny video just hit 1 million views overnight. Everyone wants a piece of you now. Can you handle the fame?",
    coverImage: "📱",
    difficulty: "beginner",
    ageRange: "8-14",
    estimatedTime: "10-15 min",
    themes: ["Social Media", "Friendship", "Pressure"],
    skills: ["Decision Making", "Consequence Thinking", "Peer Pressure"],
    nodes: [
      {
        id: "start",
        title: "You're Famous!",
        content: `You wake up to your phone EXPLODING with notifications. That silly video you posted yesterday of your cat knocking your dad's coffee into his cereal? It has 1 MILLION views.

Your best friend Mia is texting you: "DUDE YOU'RE FAMOUS!!!"

Kids from school are following you. Strangers are commenting. A kid with a huge following wants to collab. Your parents don't even know yet.

What do you do first?`,
        image: "🤳",
        choices: [
          {
            id: "tell-parents",
            text: "Wake up your parents and tell them everything",
            nextNodeId: "parents-first",
            reasoningPrompt: "Why do you want to tell your parents first?"
          },
          {
            id: "reply-everyone",
            text: "Start replying to all the comments and DMs",
            nextNodeId: "comment-chaos",
            reasoningPrompt: "What do you hope will happen if you reply to everyone?"
          },
          {
            id: "collab-dm",
            text: "Message the famous kid back about the collab",
            nextNodeId: "collab-offer",
            reasoningPrompt: "Why is the collab opportunity exciting to you?"
          }
        ]
      },
      {
        id: "parents-first",
        title: "Mom and Dad Are... Surprised",
        content: `Your parents are shocked. Dad laughs when he sees the video. "That's actually hilarious," he admits.

But Mom looks worried. "A million strangers watching my kid? We need to think about this carefully."

They say you can keep the video up, but they want to help you manage it. Dad suggests setting your account to private for now. Mom wants to read through the comments with you.

Mia texts again: "The famous kid Zack is asking why you haven't replied! He has 5 million followers! This is your CHANCE!"`,
        image: "👨‍👩‍👧",
        choices: [
          {
            id: "listen-parents",
            text: "Listen to your parents and go through comments together",
            nextNodeId: "smart-approach",
            reasoningPrompt: "What might you learn by going through comments with your parents?"
          },
          {
            id: "sneak-reply",
            text: "Agree with parents, but secretly DM Zack from the bathroom",
            nextNodeId: "secret-deal",
            reasoningPrompt: "Why do you feel like you need to do this secretly?"
          }
        ]
      },
      {
        id: "comment-chaos",
        title: "The Comments Are... A Lot",
        content: `You start reading comments. Most are nice:
"😂😂😂 the cat's FACE"
"Your dad's reaction is gold"

But then you see some mean ones:
"This kid is ugly lol"
"Not even that funny, you got lucky"
"I bet this is fake"

Your heart sinks. You didn't expect people to be mean. Then you see a DM from Zack (5 million followers): "Yo this is hilarious! Wanna make a video together? Could get you to 10 million easy 💰"

Your hands are shaking. This is a lot.`,
        image: "😰",
        choices: [
          {
            id: "close-phone",
            text: "Put down the phone and find your parents",
            nextNodeId: "parents-help",
            reasoningPrompt: "Why might taking a break be a good idea right now?"
          },
          {
            id: "reply-haters",
            text: "Reply to the mean comments to defend yourself",
            nextNodeId: "fight-back",
            reasoningPrompt: "What do you think will happen if you reply to the haters?"
          },
          {
            id: "dm-zack",
            text: "Ignore the mean comments and DM Zack",
            nextNodeId: "collab-offer",
            reasoningPrompt: "Why are you choosing to focus on the opportunity?"
          }
        ]
      },
      {
        id: "collab-offer",
        title: "Zack's Offer",
        content: `Zack replies fast: "Here's the plan - you come to my house Saturday, we recreate your video but BIGGER. Like 10 cats. I'll edit it and post to my channel. We split the money 70-30 (I get 70 cuz it's my audience). You in?"

70-30 doesn't sound great. But 30% of something huge is still big, right?

Mia texts: "Say yes!! This is once in a lifetime!!"

Your gut feels weird about this, but maybe that's just nerves?`,
        image: "🤝",
        choices: [
          {
            id: "accept-deal",
            text: "Accept the 70-30 deal",
            nextNodeId: "bad-deal",
            reasoningPrompt: "What are the pros and cons of this deal?"
          },
          {
            id: "negotiate",
            text: "Ask for 50-50 since it's YOUR video idea",
            nextNodeId: "negotiate-result",
            reasoningPrompt: "Why do you think you deserve a better split?"
          },
          {
            id: "ask-parents-deal",
            text: "Say you need to ask your parents first",
            nextNodeId: "parents-review",
            reasoningPrompt: "What might your parents notice that you didn't?"
          }
        ]
      },
      {
        id: "smart-approach",
        title: "The Smart Play",
        content: `You and your parents go through everything together. They help you:
- Turn off DMs from strangers
- Delete the mean comments (without even reading them twice)
- Find a funny comment to pin to the top
- Set up a simple rule: no posting without checking with them first

Mom finds Zack's account. "Hmm, he's been in drama before. Other kids said he took their ideas. Let's not rush into anything."

A week later, a REAL company reaches out - they want to use your video in a commercial. With your parents' help, you negotiate $2,000 and they do all the work. You don't even have to make another video.`,
        image: "🧠",
        isEnding: true,
        endingType: "great",
        endingTitle: "Smart & Steady Wins",
        endingSummary: "You made money, kept your privacy, avoided drama, and your parents trust you even more now.",
        lesson: "Sometimes the best opportunities come when you're patient and have good people helping you spot the bad deals."
      },
      {
        id: "secret-deal",
        title: "The Secret Backfires",
        content: `You sneak to the bathroom and DM Zack: "I'm in! But can't tell my parents lol"

Zack: "Haha say less 🤫 I'll send a car Saturday"

On Saturday you tell your parents you're going to Mia's house. Mia covers for you. Zack's "house" is actually a studio warehouse with bright lights everywhere. There are like 15 cats and they look stressed.

The video takes 6 hours. Zack is kind of mean to everyone on set. You're exhausted and the cats keep scratching you.

A week later, the video gets 20 million views... but Zack posted it only on HIS channel. Your name isn't even in the title. You got nothing.

Then your mom finds out when a friend shares the video with her.`,
        image: "😬",
        isEnding: true,
        endingType: "bad",
        endingTitle: "Tricked & Grounded",
        endingSummary: "You got used, got nothing, lost your parents' trust, and Mia got in trouble too for covering for you.",
        lesson: "When you have to hide something from people who care about you, that's usually a sign the decision is wrong. And people who want you to keep secrets from your family often don't have your best interests in mind."
      },
      {
        id: "parents-help",
        title: "A Breather",
        content: `You put down the phone and find your mom. You show her everything - the views, the comments, the mean ones, Zack's DM.

"Oh honey," she says. "This is a lot for anyone, let alone a kid. Let's take this slow."

She explains that mean comments are unfortunately normal online. "They say more about the person writing them than about you."

About Zack, she's skeptical. "Anyone rushing you to decide is usually not looking out for you."

She helps you write a reply: "Thanks for reaching out! Going to focus on school for now but maybe in the future."

Zack never replies. Figures.`,
        image: "💝",
        choices: [
          {
            id: "take-break",
            text: "Take a break from posting for a while",
            nextNodeId: "peaceful-ending",
            reasoningPrompt: "How might a break help you right now?"
          },
          {
            id: "keep-posting",
            text: "Keep posting new videos to ride the wave",
            nextNodeId: "burnout-path",
            reasoningPrompt: "What are you hoping will happen if you keep posting?"
          }
        ]
      },
      {
        id: "fight-back",
        title: "The War Begins",
        content: `You reply to a mean comment: "You're just jealous you're not famous 💀"

Big mistake.

The person screenshots your reply and shares it. Other people start piling on. "#[YourName]IsOverParty" starts trending. People dig up old posts from your account and twist your words.

You're crying when your parents find you. It takes weeks for the drama to die down. Some kids at school still make fun of you for it.

You learn a hard lesson about feeding trolls.`,
        image: "💔",
        isEnding: true,
        endingType: "bad",
        endingTitle: "Don't Feed the Trolls",
        endingSummary: "One angry reply turned into weeks of drama and real-life consequences at school.",
        lesson: "When someone is trying to make you angry online, replying gives them exactly what they want. The best response to hate is often no response at all."
      },
      {
        id: "bad-deal",
        title: "The 70-30 Split",
        content: `You agree to 70-30. The video goes huge - 50 million views!

But then you do the math. Zack made around $15,000 from it. Your 30% should be $4,500, right?

Zack sends you $200 through a gift card. "Production costs, bro. Cameras aren't cheap 🤷"

You have no way to prove what you're owed. You didn't sign anything. Your parents are upset but can't do much.

Mia feels bad for pushing you into it.`,
        image: "💸",
        isEnding: true,
        endingType: "bad",
        endingTitle: "Scammed",
        endingSummary: "You did all the work for someone else's profit because you didn't get the deal in writing.",
        lesson: "Verbal agreements mean nothing in business. If someone won't put a deal in writing, that's a red flag. And if a deal feels unfair at the start, it'll feel worse at the end."
      },
      {
        id: "negotiate-result",
        title: "Standing Your Ground",
        content: `You reply: "It's my video idea so I think 50-50 is fair?"

Zack: "Lol nah. 70-30 or I'll just find someone else. Plenty of kids want this opportunity."

He's trying to pressure you. But something feels off. If the opportunity was so great, why is he pushing so hard?

You screenshot the conversation and show your parents.`,
        image: "🤔",
        choices: [
          {
            id: "walk-away",
            text: "Walk away from the deal",
            nextNodeId: "self-respect",
            reasoningPrompt: "What does walking away say about you?"
          },
          {
            id: "give-in",
            text: "Fine, accept the 70-30",
            nextNodeId: "bad-deal",
            reasoningPrompt: "Why did you change your mind?"
          }
        ]
      },
      {
        id: "parents-review",
        title: "Parents Do Research",
        content: `You tell Zack you need to check with your parents.

Zack: "Ugh fine but don't take forever. Opportunities don't wait."

Your mom googles Zack. She finds:
- A Reddit thread where 3 other kids say he scammed them
- A news article about him getting sued
- His last "collab partner" posting that he stole their idea

"Absolutely not," your mom says. "This kid is bad news."

You're disappointed, but also... relieved?`,
        image: "🔍",
        choices: [
          {
            id: "trust-research",
            text: "Thank your mom and move on",
            nextNodeId: "smart-approach",
            reasoningPrompt: "How do you feel knowing you almost got scammed?"
          },
          {
            id: "still-want",
            text: "But Mom, this is my only chance at fame!",
            nextNodeId: "fomo-lesson",
            reasoningPrompt: "Why does this feel like your only chance?"
          }
        ]
      },
      {
        id: "peaceful-ending",
        title: "Peace & Quiet",
        content: `You take a month off from posting. Life goes back to normal - school, friends, soccer practice.

The weird thing? You don't miss it that much. The 15 minutes of fame was exciting, but also stressful.

A few months later, you post another video - just for fun, not for views. It gets 500 likes. And you know what? That feels better than the million did.

Some of your classmates still think you're cool. You learned that fame isn't everything.`,
        image: "😌",
        isEnding: true,
        endingType: "great",
        endingTitle: "Grounded & Happy",
        endingSummary: "You realized that going viral isn't worth losing your peace. Real life matters more.",
        lesson: "Fame and followers feel important in the moment, but they don't make you happier. The people who know you in real life matter more than strangers online."
      },
      {
        id: "burnout-path",
        title: "Chasing Views",
        content: `You post every day trying to go viral again. None of your videos hit. You're up until midnight editing.

Your grades drop. You skip hanging out with Mia to film content. You check your views constantly.

After a month, you have 50,000 followers but feel miserable. A video of you looking tired and stressed goes semi-viral for the wrong reasons: people are making fun of you.

You finally break down and tell your parents you need help.`,
        image: "😓",
        isEnding: true,
        endingType: "okay",
        endingTitle: "Burnout",
        endingSummary: "You learned the hard way that chasing numbers is exhausting and empty.",
        lesson: "Creating for views instead of for fun turns something you love into a job you hate. It's okay to step back and remember why you started."
      },
      {
        id: "self-respect",
        title: "Worth More Than That",
        content: `You tell Zack: "Thanks but I'm gonna pass. Good luck!"

Zack leaves you on read. Whatever.

A month later, you see Zack in the news - he's being sued by ANOTHER kid's parents for stealing content. Bullet dodged.

You keep posting casually. Your account grows slowly but steadily. Kids at school think you're cool for NOT selling out.

A smaller creator with 100k followers reaches out for a genuine 50-50 collab. No rushing, no pressure. You make $300 and a new friend.`,
        image: "👑",
        isEnding: true,
        endingType: "great",
        endingTitle: "Self-Respect Pays Off",
        endingSummary: "By saying no to a bad deal, you stayed true to yourself and found a better opportunity later.",
        lesson: "Saying no to something bad isn't losing an opportunity - it's making room for something better. Your self-respect is worth more than any deal."
      },
      {
        id: "fomo-lesson",
        title: "The FOMO Talk",
        content: `Your mom sits you down.

"I know it feels like this is your only chance. But that feeling has a name: FOMO - Fear Of Missing Out. And people like Zack use it to manipulate you."

She shows you stories of creators who got famous at 13, 14, 15 - some are doing great now, some are miserable, some regret everything.

"If you're meant to be famous, it'll happen. But it should happen YOUR way, on YOUR terms, not because some scammer rushed you."

It takes a few days, but you realize she's right.`,
        image: "💭",
        isEnding: true,
        endingType: "good",
        endingTitle: "FOMO Defeated",
        endingSummary: "You learned to recognize when someone is using urgency to manipulate you.",
        lesson: "When someone says 'decide NOW or lose it forever,' that's a manipulation tactic. Real opportunities don't need high-pressure tactics."
      }
    ]
  },
  {
    id: "camping-disaster",
    title: "Lost in the Woods",
    description: "A fun camping trip goes wrong when you get separated from the group. Use your head to survive and find your way back.",
    coverImage: "🏕️",
    difficulty: "intermediate",
    ageRange: "9-14",
    estimatedTime: "12-18 min",
    themes: ["Survival", "Problem Solving", "Staying Calm"],
    skills: ["Problem Breakdown", "Prioritization", "Critical Thinking"],
    nodes: [
      {
        id: "start",
        title: "Something's Wrong",
        content: `The camping trip was going great until now.

You left the group to pee behind some trees. It was only supposed to take a minute. But when you tried to walk back, everything looked the same. You walked for 10 minutes but nothing looks familiar.

Your phone has 8% battery, no signal, and it's 4 PM. The sun sets around 7 PM.

You have: a water bottle (half full), a granola bar, a pocket knife your dad gave you, and a whistle on your backpack.

Your heart is racing. What do you do first?`,
        image: "😰",
        choices: [
          {
            id: "stay-put",
            text: "Stay where you are and make noise",
            nextNodeId: "staying-smart",
            reasoningPrompt: "Why might staying in one place be better than walking around?"
          },
          {
            id: "keep-walking",
            text: "Keep walking to find the campsite",
            nextNodeId: "more-lost",
            reasoningPrompt: "How confident are you that you know the right direction?"
          },
          {
            id: "use-phone",
            text: "Try to use your phone to call for help",
            nextNodeId: "phone-dilemma",
            reasoningPrompt: "With only 8% battery and no signal, how will you use the phone?"
          }
        ]
      },
      {
        id: "staying-smart",
        title: "Making Yourself Found",
        content: `You remember what your dad said: "If you're lost, STOP. Sit. Think. Observe. Plan."

You blow your whistle - three loud blasts (the universal signal for help). You wait 30 seconds and do it again.

While waiting, you think. The group will notice you're gone. They'll come looking. But can they find you here?

You look around and notice you're in a small clearing. You could:`,
        image: "🧠",
        choices: [
          {
            id: "make-visible",
            text: "Make yourself more visible (arrange rocks, hang something bright)",
            nextNodeId: "signal-setup",
            reasoningPrompt: "How might making yourself visible help searchers?"
          },
          {
            id: "climb-tree",
            text: "Climb a tree to see if you can spot the campsite",
            nextNodeId: "tree-view",
            reasoningPrompt: "What are the risks and benefits of climbing a tree?"
          },
          {
            id: "keep-whistling",
            text: "Just keep whistling and waiting",
            nextNodeId: "patience-pays",
            reasoningPrompt: "How long should you wait before trying something else?"
          }
        ]
      },
      {
        id: "more-lost",
        title: "This Isn't Working",
        content: `You walked for another 20 minutes. Nothing looks familiar. In fact, you're pretty sure you're further from camp now.

The forest is getting denser. Your water bottle is almost empty because you've been stress-drinking. It's now 4:45 PM.

You hear a stream nearby. You're also getting tired.

Panic is starting to set in.`,
        image: "😟",
        choices: [
          {
            id: "stop-now",
            text: "STOP walking. You're making this worse.",
            nextNodeId: "finally-stop",
            reasoningPrompt: "What has walking gotten you so far?"
          },
          {
            id: "follow-stream",
            text: "Follow the stream (water leads to people, right?)",
            nextNodeId: "stream-gamble",
            reasoningPrompt: "Is this advice always true? What could go wrong?"
          },
          {
            id: "keep-pushing",
            text: "Keep going - the campsite has to be close",
            nextNodeId: "exhaustion",
            reasoningPrompt: "What is this decision based on - logic or hope?"
          }
        ]
      },
      {
        id: "phone-dilemma",
        title: "8% Battery",
        content: `You turn on your phone. No signal. 7% now.

You could:
- Try walking to higher ground to find signal (uses time and energy)
- Use the flashlight later when it gets dark
- Save it for an emergency
- Try to text your parents (might not send, but might queue up)

Every choice uses precious battery.`,
        image: "📱",
        choices: [
          {
            id: "save-battery",
            text: "Turn it off completely and save it",
            nextNodeId: "smart-save",
            reasoningPrompt: "When might you REALLY need that battery?"
          },
          {
            id: "send-text",
            text: "Send a quick text with your situation, then turn it off",
            nextNodeId: "text-sent",
            reasoningPrompt: "What information should you include in the text?"
          },
          {
            id: "find-signal",
            text: "Walk to higher ground to find signal",
            nextNodeId: "signal-hunt",
            reasoningPrompt: "Is this worth the risk of getting more lost?"
          }
        ]
      },
      {
        id: "signal-setup",
        title: "Making a Signal",
        content: `Smart thinking. You take off your bright red jacket and hang it from a tree branch where it can be seen from above.

You find some light-colored rocks and arrange them in a big arrow pointing to where you're sitting.

You blow your whistle every few minutes.

At 5:30 PM, you hear something in the distance... voices? You blow three sharp whistle blasts.

"OVER HERE!" someone shouts. It's a park ranger!

She follows the whistle sound and spots your red jacket from 50 feet away. "Smart kid," she says.`,
        image: "🎉",
        isEnding: true,
        endingType: "great",
        endingTitle: "Rescue!",
        endingSummary: "By staying put and making yourself visible, you made rescuers' jobs easy.",
        lesson: "When you're lost, your job isn't to find help - it's to make yourself FINDABLE. Staying put and signaling beats wandering around every time."
      },
      {
        id: "tree-view",
        title: "The Climb",
        content: `You find a tall tree with good branches. The climb is scary - you're about 20 feet up when a branch cracks under your foot.

You catch yourself, heart pounding.

From up here, you can see... a LOT of trees. But wait - there's smoke in the distance! That could be the campfire. It's maybe half a mile east?

You also notice the sun is getting low. If you climb down and walk that way, you might make it before dark. Or you might be wrong about the smoke.`,
        image: "🌲",
        choices: [
          {
            id: "go-toward-smoke",
            text: "Climb down and head toward the smoke",
            nextNodeId: "smoke-chase",
            reasoningPrompt: "How sure are you that's the campfire smoke?"
          },
          {
            id: "stay-mark-spot",
            text: "Climb down, but stay here and signal instead",
            nextNodeId: "signal-setup",
            reasoningPrompt: "Why might staying put still be the better choice?"
          }
        ]
      },
      {
        id: "patience-pays",
        title: "Waiting Game",
        content: `You blow the whistle every 2-3 minutes. It's boring. It's scary. You want to DO something.

But you wait.

At 5:15 PM, you hear a whistle in the distance - three blasts, just like yours! You blow yours back. Three blasts. Back and forth.

The sound is getting closer!

Ten minutes later, your dad crashes through the bushes, sweaty and panicked. When he sees you, he almost cries.

"You stayed put," he says, hugging you. "That's exactly what you should do. I'm so proud of you."`,
        image: "👨‍👧",
        isEnding: true,
        endingType: "great",
        endingTitle: "Found By Family",
        endingSummary: "Your patience and signaling paid off. Your dad found you before dark.",
        lesson: "Waiting is hard, especially when you're scared. But sometimes the bravest thing isn't running around - it's staying calm and trusting that help is coming."
      },
      {
        id: "finally-stop",
        title: "A Hard Lesson",
        content: `You force yourself to stop walking. It's hard - every instinct says MOVE.

You sit down on a log and try to calm your breathing. In through the nose, out through the mouth.

Okay. You're more lost than before, but panicking won't help. You still have your whistle. You still have time before dark.

You start blowing the whistle. Three blasts. Wait. Three blasts.`,
        image: "😤",
        choices: [
          {
            id: "systematic-signal",
            text: "Set up a proper signal system and wait",
            nextNodeId: "late-rescue",
            reasoningPrompt: "What can you do to improve your chances now?"
          },
          {
            id: "just-wait",
            text: "Just whistle and hope for the best",
            nextNodeId: "long-wait",
            reasoningPrompt: "Is hoping the same as having a plan?"
          }
        ]
      },
      {
        id: "stream-gamble",
        title: "Following Water",
        content: `You follow the stream downhill. In survival shows, they always say water leads to civilization.

But this stream is going deeper into the forest, not out of it. The terrain is getting rocky and hard to walk.

You slip on a wet rock and twist your ankle. It's not broken, but it HURTS.

Now you can barely walk. It's 5:30 PM. You're more lost than ever.

You start yelling for help.`,
        image: "🦶",
        isEnding: true,
        endingType: "bad",
        endingTitle: "Injured & Lost",
        endingSummary: "Following the stream took you deeper into the woods and now you're hurt.",
        lesson: "General survival tips don't always apply to every situation. 'Follow water' works in some places, but not others. When you're already lost, adding more walking usually makes things worse."
      },
      {
        id: "exhaustion",
        title: "Out of Energy",
        content: `You keep walking and walking. Your legs burn. Your water is gone. You're stumbling.

At 6:30 PM, the sun is setting and you have no idea where you are. You've walked probably 2 miles in random directions.

You collapse against a tree, too tired to move. It's going to be a long, cold night.

Search and rescue finds you at 2 AM using heat-detecting drones. You're dehydrated and hypothermic but alive.

The rescuer shakes his head: "You walked over 3 miles away from your camp. If you had stayed put, we would have found you in an hour."`,
        image: "🥶",
        isEnding: true,
        endingType: "bad",
        endingTitle: "A Long Night",
        endingSummary: "Walking made everything worse. You spent the night alone in the cold.",
        lesson: "When you're lost, the urge to DO something can actually hurt you. Moving without a plan just moves the problem. Sometimes the hardest and smartest thing is to STOP."
      },
      {
        id: "smart-save",
        title: "Battery Saved",
        content: `You power off your phone completely. That 7% might save your life later.

You focus on other things: making yourself visible, blowing the whistle, staying calm.

As the sun sets, you start to get cold. But you hear voices in the distance! You blow the whistle.

The search party finds you at 7:15 PM, just as it's getting dark.

Your phone still has 7% - and you realize you never needed it. The old-fashioned stuff worked.`,
        image: "🔋",
        isEnding: true,
        endingType: "great",
        endingTitle: "Low-Tech Victory",
        endingSummary: "You didn't need the phone. Smart thinking and patience were enough.",
        lesson: "Technology is great, but it's not always the answer. Basic skills like staying calm, signaling, and waiting can work better than a phone with no signal."
      },
      {
        id: "text-sent",
        title: "Message in a Bottle",
        content: `You type fast: "Got lost hiking. Near stream, in clearing with big fallen log. Heading didn't work so staying put. Please send help."

You hit send. "Message not delivered. Will retry when signal available."

You turn off the phone. 5% left.

Two hours later, search and rescue finds you by sound (they heard your whistle). When you get back to camp, your mom shows you her phone - your text arrived 45 minutes after you sent it.

"It gave us a clue where to start looking," the ranger says. "Smart to include details."`,
        image: "✉️",
        isEnding: true,
        endingType: "great",
        endingTitle: "Text Delivered",
        endingSummary: "Your text eventually went through and helped narrow down the search.",
        lesson: "Even when technology seems useless, it might work later. A detailed message with landmarks is way more helpful than 'I'm lost HELP.'"
      },
      {
        id: "signal-hunt",
        title: "The Climb for Signal",
        content: `You walk uphill for 15 minutes. Your phone finds one bar of signal! You call 911.

"Hello? I'm lost in the woods near—" The call drops.

Your phone is at 2%. You try again. No signal anymore. You've walked to an unfamiliar part of the forest and have basically no battery left.

But the 911 call might have registered your approximate location...`,
        image: "📶",
        choices: [
          {
            id: "wait-for-help",
            text: "Stay here where you made the call",
            nextNodeId: "call-worked",
            reasoningPrompt: "Why might this be a good spot to wait?"
          },
          {
            id: "go-back",
            text: "Try to go back to where you were before",
            nextNodeId: "direction-lost",
            reasoningPrompt: "Can you find your way back to the original spot?"
          }
        ]
      },
      {
        id: "smoke-chase",
        title: "Chasing Smoke",
        content: `You climb down and head east toward where you saw the smoke.

The walking is hard. The direction that looked clear from the tree is actually full of dense bushes. The sun is getting lower.

After 30 minutes, you don't see any smoke. The wind might have blown it away, or you might have gone the wrong direction.

It's 6 PM. You're exhausted and no closer to camp.`,
        image: "🌫️",
        choices: [
          {
            id: "give-up-walk",
            text: "Stop walking and set up signals here",
            nextNodeId: "late-rescue",
            reasoningPrompt: "What have you learned about walking when lost?"
          },
          {
            id: "push-on",
            text: "You're sure it was this way. Keep going.",
            nextNodeId: "exhaustion",
            reasoningPrompt: "Is this confidence or stubbornness?"
          }
        ]
      },
      {
        id: "late-rescue",
        title: "Better Late Than Never",
        content: `You set up a signal using your jacket and start whistling.

It's cold and scary waiting in the fading light. But at 7:30 PM, flashlight beams cut through the trees.

"Found them!" a voice yells.

The search took longer because you walked so far from where people expected you to be. You're cold and tired, but safe.

The ranger gives you a warm blanket. "Next time, stay put right away. But you made the right call eventually."`,
        image: "🔦",
        isEnding: true,
        endingType: "okay",
        endingTitle: "Late Rescue",
        endingSummary: "You figured it out eventually, but walking around first made everything harder.",
        lesson: "It's okay to make mistakes - what matters is recognizing them and changing course. The second-best time to stop walking is right now."
      },
      {
        id: "long-wait",
        title: "Hope Is Not a Strategy",
        content: `You whistle and wait. And wait.

But you're in a spot where sound doesn't carry well. The searchers pass within 200 feet of you but don't hear your whistle.

You spend a scary night in the woods, cold and hungry.

They find you at dawn. You're okay, but it was a long 16 hours.

Later, a ranger explains: "If you had moved to a clearing, or made visual signals, we might have found you faster. Sound doesn't always travel."`,
        image: "🌙",
        isEnding: true,
        endingType: "okay",
        endingTitle: "A Long Night",
        endingSummary: "Staying put was right, but you needed more than just a whistle.",
        lesson: "Having ONE plan isn't enough. You need multiple signals - sound AND visual. Redundancy saves lives."
      },
      {
        id: "call-worked",
        title: "911 Pinged Your Location",
        content: `You stay where you made the call and keep whistling.

Even though the call dropped, 911 got your approximate GPS location before it cut out. They relay it to the search team.

At 6:45 PM, a rescue helicopter appears overhead! You wave your arms and they spot you.

"That 911 call saved us hours," the medic says. "Even a dropped call can help."`,
        image: "🚁",
        isEnding: true,
        endingType: "great",
        endingTitle: "Helicopter Rescue!",
        endingSummary: "The brief 911 call gave them your location. Technology came through.",
        lesson: "Even partial information helps. A dropped call, an unsent text that sends later - these can all give rescuers crucial clues. Always try."
      },
      {
        id: "direction-lost",
        title: "Where Was I?",
        content: `You try to go back to where you were before, but everything looks the same. Were those the same rocks? Was that the same tree?

You're now unsure where you are, where camp is, or where you made the call.

Night falls. You're alone, lost, and your phone is dead.

Search and rescue finds you at 4 AM, shivering and scared. It works out, but just barely.`,
        image: "❓",
        isEnding: true,
        endingType: "bad",
        endingTitle: "Thoroughly Lost",
        endingSummary: "Moving around made you lose track of everything - even where you made the call from.",
        lesson: "When you're lost, every location you've been becomes important information. Once you move, you can't unmove. If you find a good spot, STAY there."
      }
    ]
  },
  {
    id: "new-kid",
    title: "The New Kid",
    description: "It's your first day at a new school. Every choice shapes who you'll become here. No pressure, right?",
    coverImage: "🏫",
    difficulty: "beginner",
    ageRange: "8-12",
    estimatedTime: "8-12 min",
    themes: ["Friendship", "Identity", "Peer Pressure"],
    skills: ["Social Decision Making", "Authenticity", "Consequence Thinking"],
    isLocked: true,
    nodes: []
  }
];

export function getStoryById(id: string): Story | undefined {
  return stories.find(s => s.id === id);
}

export function getNodeById(story: Story, nodeId: string): StoryNode | undefined {
  return story.nodes.find(n => n.id === nodeId);
}

export function getAvailableStories(): Story[] {
  return stories.filter(s => !s.isLocked);
}
