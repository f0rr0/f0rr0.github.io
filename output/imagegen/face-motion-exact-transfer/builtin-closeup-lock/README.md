# Built-in image-tool trials — September 8

These four native PNGs were generated **after** the recovered archive was pushed to PR #67. None is approved for the runtime.

Requested size: 816×816 in the prompt. Actual tool output: **1254×1254**. The tool exposes no model or size selector, so these are not claimed as verified GPT Image 2 API outputs. No generated master was resized, keyed, cropped or compressed after generation. `comparison.png` is a review-only contact sheet at 120px per portrait, not a replacement master.

| File                            | Assessment                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `center-top-2.png`              | Tighter crop than earlier API trials; candidate only.                                       |
| `center.png`                    | Candidate neutral; still needs orientation and scale consistency review against the target. |
| `center-bottom-2-overshoot.png` | Rejected: much stronger downward pitch than the supplied midpoint reference.                |
| `center-bottom-2-landmarks.png` | Reduced pitch overshoot, but collar fasteners and hair silhouette drift; not approved.      |

The full reference-target pose set has not yet been regenerated. Do not build a production atlas from these four trials.

## Exact prompts and ordered inputs

Paths below are repository-relative.

### center-top-2.png

1. `tmp/imagegen/face-motion-exact-transfer/pose-refs/transition-center-top-2.png`
2. `tmp/imagegen/face-motion-exact-transfer/pose-refs/sid-closeup-identity.png`

Create ONE photorealistic portrait animation frame, requested size 816x816. Image 1 is the exact POSE AND FRAMING target; image 2 is ONLY Sid's identity and wardrobe reference. Replace the man in image 1 with Sid from image 2, retaining image 1's exact head scale, placement, perspective, upward pitch, yaw and roll. The target looks upward with slightly raised chin, NO sideways turn. TIGHT HEADSHOT: hair nearly touches the upper edge, head fills most of the frame, chin near 75% canvas height, neck and only slivers of upper shoulders at the very bottom. Do not pull back to show chest or long neck. Keep Sid's specific facial structure, warm skin, dense voluminous side/crown hair, beard, thin gold round dark sunglasses and neutral relaxed mouth from image 2, not the reference man's identity or grin. Black overshirt over white T-shirt only visible where the tight crop permits, consistent button orientation. Flat uniform solid #FF00FF background, no shadows on background, no lettering, no panels. Match the pose target's precise camera framing while preserving Sid's likeness.

### center.png

1. `downloads/dahbiahmed-face-motion/profile/nobg/center.webp`
2. `tmp/imagegen/face-motion-exact-transfer/pose-refs/sid-closeup-identity.png`
3. `output/imagegen/face-motion-exact-transfer/builtin-closeup-lock/center-top-2.png`

Create ONE neutral portrait animation frame, requested 816x816. Image 1 is the EXACT camera-framing and head-pose target. Image 2 is Sid's identity reference. Image 3 is an upward frame of the SAME intended series: match its subject identity, hair volume and shape, color, glasses, neutral mouth and photographic finish, but NOT its upward head tilt. This new frame is the level front-facing NEUTRAL pose from image 1, looking straight ahead, zero yaw and zero roll. Replace only image 1's man with Sid. Match image 1's hair-top location, head width, chin position and neck/shoulder crop. Very tight headshot with hair at the top and chin at approximately 78 percent canvas height, only neck and a sliver of shoulder at bottom; never zoom out into a chest portrait. Preserve Sid's dense wavy side/crown hair, full beard, warm skin, thin gold round dark sunglasses, black overshirt and white T-shirt. No smile borrowed from the reference man, no mirroring, no face widening. Uniform solid #FF00FF background. One frame only, no grid, no text.

### center-bottom-2-overshoot.png

1. `tmp/imagegen/face-motion-exact-transfer/pose-refs/transition-center-bottom-2.png`
2. `tmp/imagegen/face-motion-exact-transfer/pose-refs/sid-closeup-identity.png`
3. `output/imagegen/face-motion-exact-transfer/builtin-closeup-lock/center.png`

Create ONE portrait animation frame, requested 816x816. Image 1 is the EXACT pose and framing target: a MILD downward nod, halfway between neutral and down, NOT a dramatic chin-to-chest pose. Study and match its head pitch, yaw, roll, face position, hair-top and chin locations, and shoulder/neck crop precisely. Replace image 1's man with Sid. Image 2 is Sid's identity reference; image 3 is the approved-style neutral companion for consistent face, hair, glasses, outfit, light and scale, not a pose target. Keep the same camera and subject scale as the neutral companion, but tip the head downward by the small amount shown in image 1. Eyes follow the downward direction behind the glasses. Do NOT keep the neutral head angle. Do NOT over-tilt. Preserve Sid's specific face, dense wavy dark side/crown hair, full beard, warm skin, thin gold round dark sunglasses, neutral relaxed mouth, black overshirt over white T-shirt. TIGHT headshot, hair close to top, face dominates, chin around 78 percent canvas height, neck and shoulder slivers only at the bottom. Never widen or shrink the head. Uniform solid #FF00FF background, no text, no panels, no image mirroring.

The phrase “approved-style” in that prompt was guidance for the model, not a record of user approval; the neutral frame remains a candidate.

### center-bottom-2-landmarks.png

1. `tmp/imagegen/face-motion-exact-transfer/pose-refs/transition-center-bottom-2.png`
2. `tmp/imagegen/face-motion-exact-transfer/pose-refs/sid-closeup-identity.png`

Identity transfer into IMAGE 1, one square image requested 816x816. IMAGE 1 is the full edit target and must retain its spatial layout and camera pose. IMAGE 2 supplies Sid's identity only. Replace the man in image 1 with Sid's facial features, dark wavy full hair, full beard, warm skin, thin gold round dark sunglasses, black overshirt over white T-shirt. Do NOT invent a new head angle, do NOT lean or bow the head. Copy image 1's actual orientation, not a generic directional pose. Keep horizontal gaze/eyeglass-center band at approximately 43% of canvas height, nose tip around 56%, mouth around 66%, bottom of chin around 80%, and hair close to the upper border. These landmark bands define the pose: retain them instead of lowering the eyes or mouth to invent a stronger nod. Match target head width and position, tight neck-and-head crop with only top of shoulders at the bottom edge. Sid's own proportions and likeness within that framing. Neutral relaxed mouth, not the other man's smile. Uniform pure magenta #FF00FF background, no annotations, no text, no grid. Copy the reference pose accurately rather than exaggerating any angle.
