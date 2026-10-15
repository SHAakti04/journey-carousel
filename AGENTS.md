<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application conventions
- Keep Journey content and pure loop geometry in `src/components/journey`, separate from its presentation, so animation rules can be tested without rendering.
- The Journey uses a measured, triplicated track driven by one animation-frame loop; pause and visibility changes retain its position to prevent resets.
- Define Journey visual styling in the global semantic design system so cards and responsive layouts share stable geometry.
