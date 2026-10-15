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
- Keep Journey content and pure chapter navigation in `src/components/journey`, separate from presentation, so chapter ordering can be tested without rendering.
- Journey uses a CSS perspective notebook and a temporary turning leaf; commit chapter changes after the leaf finishes and clean up all navigation timers.
- Define Journey visual styling in the global semantic design system so notebook pages and responsive layouts share stable geometry.
