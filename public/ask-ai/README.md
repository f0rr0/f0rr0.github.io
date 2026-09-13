# Header portrait

The header uses the user-selected revision 7 set: 57 frames (nine directions and 48 intermediate frames). The Ask AI widget uses its original blinking eyes.

The revision was generated with GPT Image 2.5 from Sid's approved front portrait and photographic references. It includes 33 regenerated frames across ten paths, using actual neighboring images to guide the intermediate poses. Prompts, source images, and review provenance are retained locally in `output/imagegen/face-motion-v7/` (excluded from Git).

The existing reversible compass controller switches frames with no blinking or whole-image translation. Desktop loads the atlas on first mouse movement. Mobile loads it for occasional, gentle half-turns after an initial pause; touches do not steer either face. Reduced-motion visits use only the 4.3 KB center poster. Some authored pose-spacing and hair differences remain, as shown in the reviewed set.

`portrait-atlas.webp` is an 8×8 atlas with 96px cells for the 48px header portrait at 2× DPR. `portrait.webp` is the center fallback. Both use the same fixed crop and transparency as the revision 7 review.

Rebuild with `python3 scripts/build-ask-ai-portrait.py` (Pillow and the revision 7 review assets required).
