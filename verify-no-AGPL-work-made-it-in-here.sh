#! /bin/bash
#
#

cat <<EOT

------------------------------------------------------------------------
WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING 
------------------------------------------------------------------------

We now execute a few git queries, NONE OF WHICH may report any branch
name!

Hence this script MUST be QUIET after this message (except for 
the final 'finished' statement) ...
------------------------------------------------------------------------

EOT


# gh-pages branch commit where pricing is added:
git branch --contains d999f5a02e3089c5694dcd7e29f917dd8af8da76

# next edit by @usablica, but now in master branch:
# this commit sits before tag::last-commit-before-change-to-AGPL-license 
# but we're better safe than sorry from a legal perspective: 
# this is the first commit in master branch on same or later date/time 
# as the one above: no license change yet, but it may be 
# alleged/hinted-at/whatever by a nasty BLFH:    ;-) 
git branch --contains a1dc667dc96e48d7305062c7f883ee1feac014e4

cat <<EOT

------------------------------------------------------------------------
All Checks Finished!
------------------------------------------------------------------------

EOT